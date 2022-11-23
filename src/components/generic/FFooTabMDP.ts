import MDP from "./MDP";

export default class FFooTabMDP implements MDP {
  componentName = "FFooTab";

  tabList: any[] = [];
  myRefName: string;

  constructor({ myRefName }: { myRefName: string }) {
    this.myRefName = myRefName;
  }

  addTab({ tabName, tabContent }: { tabName: string, tabContent: MDP }) {
    this.tabList.push({ tabName: tabName, tabContent: tabContent });
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

