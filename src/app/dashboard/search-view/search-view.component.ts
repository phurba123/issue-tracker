import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  public searchText:string;
  public userDetail:any;
  public newSearch:string;

  constructor(
    private route:ActivatedRoute,
    private issueService:IssueService
  ) { }

  ngOnInit(): void {
    this.searchText=this.route.snapshot.paramMap.get('searchText');
    //console.log(this.searchText);
  }

  public searchField(event)
  {
    this.newSearch='';
    
    if(event.keyCode === 13)
    {
      this.newSearch = this.searchText;
      //console.log(this.newSearch)
    }
  }

}
