import { Component, OnInit,ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import { Windowref } from '../windowref.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit, AfterViewInit {
  @ViewChild('tFolder', { static: false }) tFolderRef: ElementRef;
  @ViewChild('videoPlayer', { static: false }) videoplayer: any;
  
  hasDirectories: boolean;
  hasPictures: boolean;
  hasMovies: boolean;
  SSSPicDate: Date;
  MaxCols:number;
  tabData:JSON;
  hlddir = [];
  currDirs = [];
  folders = [];
  pictures = [];
  movies = [];
  MoviePath:string;
  tFolder:any;
 // dataService:DataService;
  nativeWindow:any;
  hldstring:string;
  BackButtonValue:string = "family";
  BackButtonDisabled:boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //console.log("onResize event.target.innerWidth", event.target.innerWidth);
    //this.MaxCols = Math.floor(event.target.innerWidth/180);
    this.MaxCols = Math.floor(this.tFolder.offsetWidth/180);

    this.MoviePath="";
    this.folders=[];
    this.pictures = [];
    this.movies=[];
    var currentNode = this.hlddir[this.hlddir.length - 1];
    this.updateTable(currentNode);
 }

  constructor(private _dataService:DataService, _windRef:Windowref) { 
    this.nativeWindow=_windRef.getNativeWindow();
    if (localStorage.SSSPicDate==null) {
      var d = new Date();
      d.setHours(d.getHours() + 8);
      localStorage.SSSPicDate=d;
    }
    else {
        this.SSSPicDate = new Date(localStorage.SSSPicDate);
        if (this.SSSPicDate.getTime() < new Date().getTime()) {
            localStorage.removeItem("SSSPics");
            var d = new Date();
            d.setHours(d.getHours() + 8);
            localStorage.SSSPicDate=d;
        }
    }
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit1");
    setTimeout(() => {
      console.log("ngAfterViewInit2");
      this.tFolder = this.tFolderRef.nativeElement;
      console.log(this.tFolder);
      this.MaxCols = Math.floor(this.tFolder.offsetWidth / 180);
      if (this.MaxCols === 0) this.MaxCols = 3;
      console.log("updateTable this.tFolder.offsetWidth", this.tFolder.offsetWidth);
      console.log("updateTable ngOnInit", this.MaxCols);
       this.initLoad(this._dataService);
    }, 300);
  }


  initLoad(dataService:DataService) {
        
    // Retrieve
    let data = localStorage.getItem("SSSPics");
    //console.log("initLoad data", data);
    console.log("initLoad data type", typeof(data));
    if (data==null || data=="undefined") {
      console.log("initLoad getPictures");
      dataService.getPictures()
        .subscribe(res => {
        //console.log("getPictures res=",res);
        //console.log("getPictures res type", typeof(res));
        this.tabData = JSON.parse(res);
        localStorage.setItem("SSSPics", res);
        this.hlddir.push(this.tabData);
        this.updateTable(this.tabData);
      },
      err => {
        console.log("Error from getUsers", err)
      });
    }
    else {
      console.log("initLoad parse");
      this.tabData = JSON.parse(data);
      this.hlddir.push(this.tabData);
      this.updateTable(this.tabData);
    }
  }
  updateTable(newNode) {

    console.log("updateTable newNode",newNode);
    let keys = Object.keys(newNode.folders);
    console.log("updateTable keys",keys);
    let celPos = 0;
    

  let tmpFolders = [];  
    for(var i=0;i<keys.length;i++)
    {
        var datacell = newNode.folders[keys[i]];
        if (datacell.CellType=="Folder") {
          tmpFolders.push(datacell);
        }
    }

    console.log("updateTable keys",keys);
    console.log("updateTable tmpFolders len", tmpFolders.length);
    console.log("updateTable MaxCols", this.MaxCols);
    
    let MaxRows = Math.floor(tmpFolders.length/this.MaxCols);
    console.log("updateTable MaxRows", MaxRows);
    if ((tmpFolders.length % this.MaxCols) > 0) MaxRows++;
    console.log("updateTable MaxRows", MaxRows);
    
    for (let x=0;x<MaxRows;x++) {
      for (let y=0;y<this.MaxCols;y++) {
        celPos = x + (y*MaxRows);
        if (celPos>tmpFolders.length) {
              this.folders.push({Name:""});
            }
            else {
            let datacell = tmpFolders[celPos];
            if (datacell!=null) 
                  this.folders.push(datacell);
            else 
              this.folders.push({Name:""});
            }
        }
      }
    this.hasDirectories = this.folders.length>0;
    console.log("updateTable this.folders len", this.folders.length);

    for(var i=0;i<keys.length;i++)
    {
        var datacell = newNode.folders[keys[i]];
        if (datacell.CellType=="File" && datacell.FileType=="Image") {
          this.pictures.push(datacell);
        }
    }
    
    this.hasPictures = this.pictures.length>0;
    console.log("updateTable this.pictures len", this.pictures.length);
  
    for(var i=0;i<keys.length;i++)
    {
        var datacell = newNode.folders[keys[i]];
        if (datacell.CellType=="File" && datacell.FileType=="Movie") {
          this.movies.push(datacell);
        }
    }
    this.hasMovies = this.movies.length>0;
    console.log("updateTable this.movies len", this.movies.length);

    
  }
  
  FullPic(path){
    console.log("FullPic path", path);
    var nwin = this.nativeWindow.open("./PicsPage.html");
    nwin.opener.pth2 = "http://www.schuebelsoftware.com/SSSWebAPI/api/Image?Height=&Width=&FilePath=" + path;
  }

  ChangeMovie(path){
    console.log("ChangeMovie path", path);
    let hldpath = path.replace("d:/inetpub/", "http://www.schuebelsoftware.com/"); 
    //f:/inetpub/family/jt/jmallwalkwave.mp4
    //let hldpath  ="http://www.schuebelsoftware.com/family/jt/jmallwalkwave.mp4";
    console.log("ChangeMovie updated hldpath", hldpath);
 
    this.MoviePath=hldpath;
    this.videoplayer.nativeElement.play();
  }

  BackLoadit(){
    this.MoviePath="";
    this.folders=[];
    this.pictures = [];
    this.movies=[];
    this.hlddir.pop();
    var currentNode = this.hlddir[this.hlddir.length - 1];
    this.updateTable(currentNode);

    if (this.hlddir.length>1) {
        this.BackButtonValue = "Back to: " + this.hlddir[this.hlddir.length - 2].Name;
        this.BackButtonDisabled=false;
    }
    else {
        this.BackButtonValue = currentNode.Name;
        this.BackButtonDisabled=true;
    }

  }

  Loadit(newName){
    console.log("vbLoadit newName", newName);
    this.MoviePath="";
    this.folders=[];
    this.pictures = [];
    this.movies=[];
    var parentNode = this.hlddir[this.hlddir.length - 1];
    var currentNode = parentNode.folders[newName];
    this.updateTable(currentNode);

    this.BackButtonValue = "Back to: " + parentNode.Name;
    this.BackButtonDisabled=false;
    this.hlddir.push(currentNode);
  }


}
