import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Modules
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";

// Components
import { HeaderComponent } from "./components/header/header.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { UserAvatarComponent } from "./components/user-avatar/user-avatar.component";
import { SidebarNavComponent } from "./components/sidebar-nav/sidebar-nav.component";

@NgModule({
  declarations: [HeaderComponent, UserAvatarComponent, SidebarNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [HeaderComponent, SidebarNavComponent]
})
export class CoreModule {}
