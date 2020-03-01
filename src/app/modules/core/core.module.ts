import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomMaterialModule } from "src/app/core/material.module";

// Components
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserAvatarComponent } from "./components/user-avatar/user-avatar.component";
import { SidebarNavComponent } from "./components/sidebar-nav/sidebar-nav.component";
import { PlaceholderComponent } from "./components/placeholder/placeholder.component";

@NgModule({
  declarations: [
    HeaderComponent,
    UserAvatarComponent,
    SidebarNavComponent,
    PlaceholderComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule, CustomMaterialModule],
  exports: [HeaderComponent, SidebarNavComponent]
})
export class CoreModule {}
