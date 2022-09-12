import MDP from "./MDP";

export default class FTabMDP implements MDP {
  componentName = "FTab";

  tabList: any[] = [];
  myRefName: string;

  constructor({ myRefName }: { myRefName: string }) {
    this.myRefName = myRefName;
  }

  addTab({name, routerName}:{name: string, routerName: MDP}) {
    this.tabList.push({ name: name, routerName: routerName });
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

