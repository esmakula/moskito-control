import { Component, OnInit } from "@angular/core";
import { MoskitoApplicationService } from "../services/moskito-application.service";
import { StatusStatistics } from "../entities/status-statistic";
import { StatusService } from "../services/status.service";


@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  statistics: StatusStatistics[];


  constructor(private moskitoApplicationService: MoskitoApplicationService, private statusService: StatusService) { }

  public ngOnInit() {
    this.moskitoApplicationService.dataRefreshEvent.subscribe(() => this.refresh());
    this.moskitoApplicationService.applicationChangedEvent.subscribe(() => this.refresh());
    this.refresh();
  }

  public refresh() {
    this.statistics = [];

    let statsDictionary = StatusStatistics.getDefaultStatistics();
    for (let component of this.moskitoApplicationService.currentApplication.components) {
      if (!statsDictionary[component.color]) {
        statsDictionary[component.color] = 0;
      }

      statsDictionary[component.color] += 1;
    }

    const statusFilter = this.statusService.filter;

    // Transfer status dictionary to array of statistics objects
    for (let status in statsDictionary) {
      this.statistics.push(new StatusStatistics(status, statsDictionary[status], statusFilter.indexOf(status) !== -1));
    }
  }

  public addStatusFilter(status: StatusStatistics) {
    this.statusService.addFilter(status.status);
    status.selected = true;
  }

  public removeStatusFilter(status: StatusStatistics) {
    this.statusService.removeFilter(status.status);
    status.selected = false;
  }

  clearFilter(event: Event) {
    event.preventDefault();
    this.statusService.resetFilter();

    // Clear selected for all stats
    this.statistics.forEach((stat) => stat.selected = false);
  }
}
