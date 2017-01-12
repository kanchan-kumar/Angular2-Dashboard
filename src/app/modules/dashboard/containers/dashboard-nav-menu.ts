import { DashboardMenuDef } from './dashboard-menu-def';

export class DashboardNavMenu {

  constructor() {
  }

  getNavMenuByProductType(product: string, onMenuClick) {
    try {
      /* Main Menu Array. */
      let navMenuArray = new Array<DashboardMenuDef>();

      /*Menu Definition.*/
      let transaction = new DashboardMenuDef('Transaction', '', null, onMenuClick);
      let graphWithBreadcrumbLast1 = new DashboardMenuDef('Last 1', '', null, onMenuClick);
      let graphWithBreadcrumbLast2 = new DashboardMenuDef('Last 2', '', null, onMenuClick);
      let graphWithBreadcrumbLast3 = new DashboardMenuDef('Last 3', '', null, onMenuClick);
      let graphWithBreadcrumbLast4 = new DashboardMenuDef('Last 4', '', null, onMenuClick);
      let graphWithBreadcrumbLast5 = new DashboardMenuDef('Last 5', '', null, onMenuClick);

      let scenDiff = new DashboardMenuDef('Scenario Difference', '', null, onMenuClick);
      let scriptDiff = new DashboardMenuDef('Script Difference', '', null, onMenuClick);
      let serverSignDiff = new DashboardMenuDef('Server Signature Difference', '', null, onMenuClick);
      let runTimeProgress = new DashboardMenuDef('Run Time Progress', '', null, onMenuClick);
      let virtualUserTrace = new DashboardMenuDef('Virtual User Trace', '', null, onMenuClick);
      let stats = new DashboardMenuDef('Stats', '', null, onMenuClick);
      let events = new DashboardMenuDef('Events', '', null, onMenuClick);
      let testOutputSubMenu =  new DashboardMenuDef('View in Panel', '', null, onMenuClick);

      /* Test Output Sub Menu Array. */
      let arrTestRunOutputMenu = new Array<DashboardMenuDef>();
      arrTestRunOutputMenu.push(testOutputSubMenu);

      let testOutput =  new DashboardMenuDef('Test Output', '', arrTestRunOutputMenu, onMenuClick);
      let pauseResumeLog =  new DashboardMenuDef('Pause Resume Log', '', null, onMenuClick);
      let debugTestLog =  new DashboardMenuDef('Debug Trace Log', '', null, onMenuClick);

      let arrGraphWithBreadCrumbMenu = new Array<DashboardMenuDef>();
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast1);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast2);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast3);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast4);
      arrGraphWithBreadCrumbMenu.push(graphWithBreadcrumbLast5);

      /* Adding Graph With Breadcrumb sub menu.*/
      let graphWithBreadcrumb = new DashboardMenuDef('Graph With Breadcrumb', '', arrGraphWithBreadCrumbMenu, null);

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
      let viewMenu = new DashboardMenuDef('View', 'fa-eye', arrViewMenuItems, null);

      /* Array for Action Menu Items.*/
      let arrActionMenuItems = new Array<DashboardMenuDef>();

      /* Action Menu Items.*/
      let compare = new DashboardMenuDef('Compare', '', null, onMenuClick);
      let derivedGraph = new DashboardMenuDef('Derived Graph', '', null, onMenuClick);
      let updateUserSessRate = new DashboardMenuDef('Update User/Session Rate', '', null, onMenuClick);
      let updateDataFile = new DashboardMenuDef('Update Data File', '', null, onMenuClick);

      let actionMenu = new DashboardMenuDef('Actions', 'fa-shield', arrActionMenuItems, null);

      let takeThreadDump = new DashboardMenuDef('Take Thread Dump', '', null, onMenuClick);
      let analyzeThreadDump = new DashboardMenuDef('Analyze Thread Dump', '', null, onMenuClick);
      let scheduleThreadDump = new DashboardMenuDef('Schedule Thread Dump', '', null, onMenuClick);
      let heapDump = new DashboardMenuDef('Heap Dump', '', null, onMenuClick);
      let tcpDump = new DashboardMenuDef('TCP Dump', '', null, onMenuClick);
      let missonCrl = new DashboardMenuDef('Mission Control', '', null, onMenuClick);
      let runCmd = new DashboardMenuDef('Run Command', '', null, onMenuClick);
      let importDataCVS = new DashboardMenuDef('Import data from CSV file', '', null, onMenuClick);
      let importDataAccess = new DashboardMenuDef('Import data from Access Log file', '', null, onMenuClick);
      let synPoint = new DashboardMenuDef('Sync Point(s)', '', null, onMenuClick);
      let alertSetting = new DashboardMenuDef('Alert Settings"', '', null, onMenuClick);
      let alertPolicy = new DashboardMenuDef('Alert Policy', '', null, onMenuClick);
      let alertAction = new DashboardMenuDef('Alert Actions', '', null, onMenuClick);
      let baseLine = new DashboardMenuDef('Baseline', '', null, onMenuClick);
      let rules = new DashboardMenuDef('Rules', '', null, null);
      let capacityAlert = new DashboardMenuDef('Capacity', '', null, onMenuClick);
      let behaviourAlert = new DashboardMenuDef('Behavior', '', null, onMenuClick);
      let alertHistory = new DashboardMenuDef('Alert History', '', null, onMenuClick);

      /* Thread Dump Menu Options. */
      let arrThreadDumpOptions = new Array<DashboardMenuDef>();
      arrThreadDumpOptions.push(takeThreadDump);
      arrThreadDumpOptions.push(analyzeThreadDump);
      arrThreadDumpOptions.push(scheduleThreadDump);

      let threadDump = new DashboardMenuDef('Thread Dump', '', arrThreadDumpOptions, null);

      /* Diagnostics Menu Array. */
      let arrDiagnosticsMenu = new Array<DashboardMenuDef>();
      arrDiagnosticsMenu.push(threadDump);
      arrDiagnosticsMenu.push(heapDump);
      arrDiagnosticsMenu.push(tcpDump);
      arrDiagnosticsMenu.push(missonCrl);
      arrDiagnosticsMenu.push(runCmd);

      let diagnostics  = new DashboardMenuDef('Diagnostics', '', arrDiagnosticsMenu, null);

      /* External Monitor Menu Array. */
      let arrExtMontArray =  new Array<DashboardMenuDef>();
      arrExtMontArray.push(importDataCVS);
      arrExtMontArray.push(importDataAccess);

      /* External Monitor Menu. */
      let extMonitor = new DashboardMenuDef('External Monitors', '', arrExtMontArray, null);

      arrActionMenuItems.push(compare);
      arrActionMenuItems.push(derivedGraph);
      arrActionMenuItems.push(updateUserSessRate);
      arrActionMenuItems.push(updateDataFile);
      arrActionMenuItems.push(diagnostics);
      arrActionMenuItems.push(extMonitor);
      arrActionMenuItems.push(synPoint);

      let favMenu = new DashboardMenuDef('Favorites', 'fa-star', null, null);

      /* Alert Sub Menu Array */
      let arrAlertSubMenu =  new Array<DashboardMenuDef>();
      arrAlertSubMenu.push(capacityAlert);
      arrAlertSubMenu.push(behaviourAlert);

      /*Adding Inner Alert Menu.*/
      let innerAlertMenu = new DashboardMenuDef('Alerts', '', arrAlertSubMenu, null);

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
      let alerts = new DashboardMenuDef('Alerts', 'fa-bell', arrAlertMenu, null);

      let configuartionMenu = new DashboardMenuDef('Configuration', '', null, null);

      /* Settings Menu Array. */
      let arrSettingsArray =  new Array<DashboardMenuDef>();
      arrSettingsArray.push(configuartionMenu);

      /* Setting Menu. */
      let settingMenu = new DashboardMenuDef('Settings', 'fa-cog', arrSettingsArray, null);

      /* Template Menu. */
      let templateMenu = new DashboardMenuDef('Templates', 'fa-file-powerpoint-o', null, onMenuClick);

      /* Report Menu. */
      let reportMenu = new DashboardMenuDef('Reports', 'fa-credit-card', null, onMenuClick);

      /* Help Menu. */
      let helpMenu = new DashboardMenuDef('Help', 'fa-question-circle', null, onMenuClick);

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
    } catch (e) { console.error(e); }
  }
}
