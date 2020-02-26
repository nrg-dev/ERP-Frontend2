export class MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;

  constructor(id: string, label: string, icon: string, path: string) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.path = path;
  }
}
