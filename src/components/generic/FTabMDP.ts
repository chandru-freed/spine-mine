import MDP from "./MDP";

export default class FTabMDP implements MDP {
  componentName = "FTab";

  tabList: any[] = [];
  myRefName: string;

  constructor({ myRefName }: { myRefName: string }) {
    this.myRefName = myRefName;
  }

  addTab({ tabName, routerName,authenticatedGroupList=[] }: { tabName: string, routerName: string,authenticatedGroupList?: string[] }) {
    this.tabList.push({ tabName: tabName, routerName: routerName,authenticatedGroupList });
    return this;
  }

  getMetaData(): object {
    return {
      myRefName: this.myRefName,
      componentName: this.componentName,
      props: {
        myRefName: this.myRefName,
        tabList: this.tabList,
      },
    };
  }

  
}

