import { DashboardMenuDef } from './dashboard-menu-def';

export class DashboardNavMenu {

  constructor() {
  }

  getNavMenuByProductType(product: string) {
    try
    {
      /* Main Menu Array. */
      let navMenuArray = new Array<DashboardMenuDef>();

      /*Menu Definition.*/
      let transaction = new DashboardMenuDef('Transaction', '', null);
      let graphWithBreadcrumbLast1 = new DashboardMenuDef('Last 1', '', null);
      let graphWithBreadcrumbLast2 = new DashboardMenuDef('Last 2', '', null);
      let graphWithBreadcrumbLast3 = new DashboardMenuDef('Last 3', '', null);
      let graphWithBreadcrumbLast4 = new DashboardMenuDef('Last 4', '', null);
      let graphWithBreadcrumbLast5 = new DashboardMenuDef('Last 5', '', null);

      let scenDiff = new DashboardMenuDef('Scenario Difference', '', null);
      let scriptDiff = new DashboardMenuDef('Script Difference', '', null);
      let serverSignDiff = new DashboardMenuDef('Server Signature Difference', '', null);
      let runTimeProgress = new DashboardMenuDef('Run Time Progress', '', null);
      let virtualUserTrace = new DashboardMenuDef('Virtual User Trace', '', null);
      let stats = new DashboardMenuDef('Stats', '', null);
      let events = new DashboardMenuDef('Events', '', null);
      let testOutputSubMenu =  new DashboardMenuDef('View in Panel', '', null);

      /* Test Output Sub Menu Array. */
      let arrTestRunOutputMenu = new Array<DashboardMenuDef>();
      arrTestRunOutputMenu.push(testOutputSubMenu);

      let testOutput =  new DashboardMenuDef('Test Output', '', arrTestRunOutputMenu);
      let pauseResumeLog =  new DashboardMenuDef('Pause Resume Log', '', null);
      let debugTestLog =  new DashboardMenuDef('Debug Trace Log', '', null);

      let arrGraphWithBreadCrumbMenu = new Array<DashboardMenuDef>();
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast1);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast2);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast3);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast4);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast5);

      /* Adding Graph With Breadcrumb sub menu.*/
      let graphWithBreadcrumb = new DashboardMenuDef('Graph With Breadcrumb', '', arrGraphWithBreadCrumbMenu);

      /* View Menu Items. */
      let arrViewMenuItems = new Array<DashboardMenuDef>();
      arrViewMenuItems.push(transaction);
      arrViewMenuItems.push(graphWithBreadcrumb);
      arrViewMenuItems.push(scenDiff);
      arrViewMenuItems.push(scriptDiff);
      arrViewMenuItems.push(serverSignDiff);
      arrViewMenuItems.push(events);
      arrViewMenuItems.push(debugTestLog);
      arrViewMenuItems.push(pauseResumeLog);
      arrViewMenuItems.push(runTimeProgress);
      arrViewMenuItems.push(virtualUserTrace);
      arrViewMenuItems.push(stats);
      arrViewMenuItems.push(testOutput);

      /* Now Creating View Menu. */
      let viewMenu = new DashboardMenuDef('View', 'fa-eye', arrViewMenuItems);

      /* Array for Action Menu Items.*/
      let arrActionMenuItems = new Array<DashboardMenuDef>();

      /* Action Menu Items.*/
      let compare = new DashboardMenuDef('Compare', '', null);
      let derivedGraph = new DashboardMenuDef('Derived Graph', '', null);
      let updateUserSessRate = new DashboardMenuDef('Update User/Session Rate', '', null);
      let updateDataFile = new DashboardMenuDef('Update Data File', '', null);

      let actionMenu = new DashboardMenuDef('Actions', 'fa-shield', arrActionMenuItems);

      let takeThreadDump = new DashboardMenuDef('Take Thread Dump', '', null);
      let analyzeThreadDump = new DashboardMenuDef('Analyze Thread Dump', '', null);
      let scheduleThreadDump = new DashboardMenuDef('Schedule Thread Dump', '', null);
      let heapDump = new DashboardMenuDef('Heap Dump', '', null);
      let tcpDump = new DashboardMenuDef('TCP Dump', '', null);
      let missonCrl = new DashboardMenuDef('Mission Control', '', null);
      let runCmd = new DashboardMenuDef('Run Command', '', null);
      let importDataCVS = new DashboardMenuDef('Import data from CSV file', '', null);
      let importDataAccess = new DashboardMenuDef('Import data from Access Log file', '', null);
      let synPoint = new DashboardMenuDef('Sync Point(s)', '', null);
      let alertSetting = new DashboardMenuDef('Alert Settings"', '', null);
      let alertPolicy = new DashboardMenuDef('Alert Policy', '', null);
      let alertAction = new DashboardMenuDef('Alert Actions', '', null);
      let baseLine = new DashboardMenuDef('Baseline', '', null);
      let rules = new DashboardMenuDef('Rules', '', null);
      let capacityAlert = new DashboardMenuDef('Capacity', '', null);
      let behaviourAlert = new DashboardMenuDef('Behavior', '', null);
      let alertHistory = new DashboardMenuDef('Alert History', '', null);

      /* Thread Dump Menu Options. */
      let arrThreadDumpOptions = new Array<DashboardMenuDef>();
      arrThreadDumpOptions.push(takeThreadDump);
      arrThreadDumpOptions.push(analyzeThreadDump);
      arrThreadDumpOptions.push(scheduleThreadDump);

      let threadDump = new DashboardMenuDef('Thread Dump', '', arrThreadDumpOptions);

      /* Diagnostics Menu Array. */
      let arrDiagnosticsMenu = new Array<DashboardMenuDef>();
      arrDiagnosticsMenu.push(threadDump);
      arrDiagnosticsMenu.push(heapDump);
      arrDiagnosticsMenu.push(tcpDump);
      arrDiagnosticsMenu.push(missonCrl);
      arrDiagnosticsMenu.push(runCmd);

      let diagnostics  = new DashboardMenuDef('Diagnostics', '', arrDiagnosticsMenu);

      /* External Monitor Menu Array. */
      let arrExtMontArray =  new Array<DashboardMenuDef>();
      arrExtMontArray.push(importDataCVS);
      arrExtMontArray.push(importDataAccess);

      /* External Monitor Menu. */
      let extMonitor = new DashboardMenuDef('External Monitors', '', arrExtMontArray);

      arrActionMenuItems.push(compare);
      arrActionMenuItems.push(derivedGraph);
      arrActionMenuItems.push(updateUserSessRate);
      arrActionMenuItems.push(updateDataFile);
      arrActionMenuItems.push(diagnostics);
      arrActionMenuItems.push(extMonitor);
      arrActionMenuItems.push(synPoint);

      let favMenu = new DashboardMenuDef('Favorites', 'fa-star', null);

      /* Alert Sub Menu Array */
      let arrAlertSubMenu =  new Array<DashboardMenuDef>();
      arrAlertSubMenu.push(capacityAlert);
      arrAlertSubMenu.push(behaviourAlert);

      /*Adding Inner Alert Menu.*/
      let innerAlertMenu = new DashboardMenuDef('Alerts', '', arrAlertSubMenu);

      /* Alert Menu Array. */
      let arrAlertMenu =  new Array<DashboardMenuDef>();
      arrAlertMenu.push(alertSetting);
      arrAlertMenu.push(alertPolicy);
      arrAlertMenu.push(alertAction);
      arrAlertMenu.push(baseLine);
      arrAlertMenu.push(rules);
      arrAlertMenu.push(innerAlertMenu);
      arrAlertMenu.push(alertHistory);

      /*Creating Alert Menu*/
      let alerts = new DashboardMenuDef('Alerts', 'fa-bell', arrAlertMenu);

      let configuartionMenu = new DashboardMenuDef('Configuration', '', null);

      /* Settings Menu Array. */
      let arrSettingsArray =  new Array<DashboardMenuDef>();
      arrSettingsArray.push(configuartionMenu);

      /* Setting Menu. */
      let settingMenu = new DashboardMenuDef('Settings', 'fa-cog', arrSettingsArray);

      /* Template Menu. */
      let templateMenu = new DashboardMenuDef('Templates', 'fa-file-powerpoint-o', null);

      /* Report Menu. */
      let reportMenu = new DashboardMenuDef('Reports', 'fa-credit-card', null);

      /* Help Menu. */
      let helpMenu = new DashboardMenuDef('Help', 'fa-question-circle', null);

      /* Adding Menu in Array. */
      navMenuArray.push(viewMenu);
      navMenuArray.push(actionMenu);
      navMenuArray.push(favMenu);
      navMenuArray.push(alerts);
      navMenuArray.push(settingMenu);
      navMenuArray.push(templateMenu);
      navMenuArray.push(reportMenu);
      navMenuArray.push(helpMenu);

      return navMenuArray;
    }
    catch(e) { console.error(e); }
  }
}
