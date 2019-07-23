using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using System.Net;
using System.Net.Http;
using System.Web;

using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

using System.IO;
using Newtonsoft.Json;
using SSSCalWebCore.Models;
using Microsoft.AspNetCore.Authorization;

namespace GatewayApi.Controllers
{
    public class Audience
    {
        public string Secret { get; set; }
        public string Iss { get; set; }
        public string Aud { get; set; }
    }

    public class PersonDTO{
        public General Person  { get; set; }
    }

 
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        

        private readonly AppSettings _appSettings;

        public AuthController(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        [HttpPost("token")]
        public ActionResult Token([FromBody]PersonDTO p)
        {


            if (p.Person.Name == "jim" && p.Person.Pager == "pass")
            {

                var now = DateTime.UtcNow;

                var claims = new Claim[]
                {
                    new Claim(JwtRegisteredClaimNames.Email,  _appSettings.Iss),
                   new Claim("role",  "MAdmin"),
                   new Claim("role",  "User"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64),
                    new Claim(JwtRegisteredClaimNames.Sub, p.Person.Name)
                 };

                var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = signingKey,
                    ValidateIssuer = true,
                    ValidIssuer = _appSettings.Iss,
                    ValidateAudience = true,
                    ValidAudience = _appSettings.Aud,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = true,

                };

                var jwt = new JwtSecurityToken(
                    issuer: _appSettings.Iss,
                    audience: _appSettings.Aud,
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TimeSpan.FromMinutes(15)),
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                var responseJson = new
                {
                    access_token = encodedJwt,
                    expires_in = (int)TimeSpan.FromMinutes(2).TotalSeconds
                };

                return Ok(responseJson);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("loggeduser")]
        [Authorize()]
        public ActionResult loggeduser()
        {
            System.Security.Claims.ClaimsPrincipal currentUser = this.User;

            var nameClaim = currentUser.Claims.Where(x => x.Type.ToString()=="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").FirstOrDefault();
            var name = nameClaim.Value;
            var claims = new List<Claim>();
            var RoleClaims = currentUser.Claims.Where(x => x.Type.ToString()=="http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
            foreach(var rol in RoleClaims){
                claims.Add(new Claim("role", rol.Value));
            }

            var TokenRes = new {
                username = name,
                claims = claims  //currentUser.Claims
            };
            return Ok(TokenRes);
        }
        
        // GET api/values
        public ActionResult GetToken()
        {
            try {
				
                var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appSettings.Secret));
                var token = new JwtSecurityToken(
                    issuer: _appSettings.Iss,
                    audience:_appSettings.Aud,
                    expires:DateTime.Now.AddMinutes(15),
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );


                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            catch(Exception ex) {

              ModelState.AddModelError("Person:Get", ex.Message);
              return BadRequest(ModelState);  
            }
        }
    }
}
