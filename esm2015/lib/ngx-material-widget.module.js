import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//import { MatFileUploadModule } from 'mat-file-upload';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
//import { EditorModule } from '@progress/kendo-angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { AbilityModule } from '@casl/angular';
import { Ability, PureAbility } from '@casl/ability';
import { TooltipModule } from 'ng2-tooltip-directive';
//import { ButtonModule } from './button/button.module';
import { ButtonComponent } from './button/component/button/button.component';
import { ButtonGroupComponent } from './button/component/button-group/button-group.component';
import { CrudFormComponent } from './crud/component/crud-form/crud-form.component';
import { CrudListComponent, BottomSearchSheet } from './crud/component/crud-list/crud-list.component';
import { FileUploaderComponent } from './field/component/file-uploader/file-uploader.component';
import { FieldComponent } from './field/component';
import { StaticListComponent } from './list/component/static-list/static-list.component';
import { DynamicListComponent } from './list/component/dynamic-list/dynamic-list.component';
import { ModalComponent } from './modal/component/modal/modal.component';
import { ButtonDeleteConfirmationComponent } from './button/component/button-delete-confirmation/button-delete-confirmation.component';
import { AdminLayoutComponent } from './page/component/admin-layout/admin-layout.component';
import { ListComponent } from './list/component/list.component';
import { CrudHeaderComponent } from './crud/component/crud-header/crud-header.component';
import { FormComponent, FormHeaderComponent } from './form/component';
import { CrudListComponentInterface } from './crud/interface/crud-list/crud-list-interface.component';
import { QuillModule } from 'ngx-quill';
import { ChipsComponent } from './field/component/chips/chips.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './field/component/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MultiImageComponent } from './field/component/multi-image/multi-image.component';
import { ParagraphComponent } from './field/component/paragraph/paragraph.component';
import { HighlightPipe } from './field/pipes/highlightPipe';
//import { DynamicModule } from 'ng-dynamic-component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MdePopoverModule } from '@material-extended/mde';
import { TooltipComponent } from './field/component/tooltip/tooltip.component';
import { NgInit } from './list/directives/ngInit.directive';
import { SafeHtmlPipe } from './list/pipes/safeHtml.pipe';
import { cfTemplateDirective } from './list/directives/compile.directive';
import { NavigationComponent } from './navigation/component/navigation/navigation.component';
const ɵ0 = new Ability();
export class MaterialWidgetModule {
}
MaterialWidgetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ButtonComponent,
                    ButtonGroupComponent,
                    ButtonDeleteConfirmationComponent,
                    CrudHeaderComponent,
                    CrudFormComponent,
                    CrudListComponent,
                    CrudListComponentInterface,
                    BottomSearchSheet,
                    FileUploaderComponent,
                    FieldComponent,
                    // FieldHorizontalLayoutComponent,
                    // FieldVerticalLayoutComponent,
                    // FieldInlineLayoutComponent,
                    // FieldLayoutComponent,
                    FormHeaderComponent,
                    FormComponent,
                    AdminLayoutComponent,
                    ListComponent,
                    StaticListComponent,
                    DynamicListComponent,
                    ModalComponent,
                    ChipsComponent,
                    ToolbarComponent,
                    MultiImageComponent,
                    ParagraphComponent,
                    HighlightPipe,
                    TooltipComponent,
                    NgInit,
                    SafeHtmlPipe,
                    cfTemplateDirective,
                    NavigationComponent
                ],
                imports: [
                    // ButtonModule,
                    // CrudModule,
                    // FieldModule,
                    // ListModule,
                    // ModalModule,
                    // NavigationModule,
                    // PageModule,
                    // PrivilegeModule, 
                    // SettingModule
                    CommonModule,
                    //    BrowserModule,
                    //    BrowserAnimationsModule,
                    //    NoopAnimationsModule,
                    HttpClientModule,
                    RouterModule,
                    //    DynamicModule,
                    MdePopoverModule,
                    ReactiveFormsModule,
                    TooltipModule,
                    LayoutModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatMenuModule,
                    MatChipsModule,
                    MatIconModule,
                    MatBadgeModule,
                    MatDialogModule,
                    MatCardModule,
                    MatTabsModule,
                    MatExpansionModule,
                    MatSidenavModule,
                    MatBottomSheetModule,
                    MatDividerModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatSelectModule,
                    MatAutocompleteModule,
                    MatCheckboxModule,
                    MatRadioModule,
                    MatDatepickerModule,
                    MatMomentDateModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatListModule,
                    MatTableModule,
                    MatSortModule,
                    MatPaginatorModule,
                    MatGridListModule,
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    DragDropModule,
                    // FroalaEditorModule.forRoot(), 
                    // FroalaViewModule.forRoot(),
                    //    MatFileUploadModule,
                    // ReactiveFormsModule,
                    // EditorModule,
                    MatTooltipModule,
                    MatDividerModule,
                    MatSidenavModule,
                    MatExpansionModule,
                    MatFormFieldModule,
                    MatCardModule,
                    MatDividerModule,
                    MatButtonModule,
                    MatIconModule,
                    MatCardModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatCheckboxModule,
                    MatDialogModule,
                    QuillModule.forRoot(),
                    AbilityModule,
                    FlexLayoutModule,
                    MatToolbarModule,
                    InfiniteScrollModule
                ],
                exports: [
                    ButtonComponent,
                    ButtonGroupComponent,
                    CrudListComponentInterface,
                    CrudFormComponent,
                    CrudListComponent,
                    FileUploaderComponent,
                    FieldComponent,
                    // FieldHorizontalLayoutComponent,
                    // FieldVerticalLayoutComponent,
                    // FieldInlineLayoutComponent,
                    // FieldLayoutComponent,
                    FormComponent,
                    FormHeaderComponent,
                    StaticListComponent,
                    DynamicListComponent,
                    ModalComponent,
                    //    DynamicModule,
                    MdePopoverModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatMenuModule,
                    MatChipsModule,
                    MatIconModule,
                    MatBadgeModule,
                    MatDialogModule,
                    MatCardModule,
                    MatTabsModule,
                    MatExpansionModule,
                    MatSidenavModule,
                    MatBottomSheetModule,
                    MatDividerModule,
                    MatIconModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatIconModule,
                    MatSelectModule,
                    MatAutocompleteModule,
                    MatCheckboxModule,
                    MatRadioModule,
                    MatDatepickerModule,
                    MatMomentDateModule,
                    MatSliderModule,
                    MatSlideToggleModule,
                    MatListModule,
                    MatTableModule,
                    MatSortModule,
                    MatPaginatorModule,
                    MatGridListModule,
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    // FroalaEditorModule.forRoot(), 
                    // FroalaViewModule.forRoot(),
                    //    MatFileUploadModule,
                    // ReactiveFormsModule,
                    // EditorModule,
                    MatTooltipModule,
                    MatDividerModule,
                    MatSidenavModule,
                    MatExpansionModule,
                    MatFormFieldModule,
                    MatCardModule,
                    MatDividerModule,
                    MatButtonModule,
                    MatIconModule,
                    MatCardModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatCheckboxModule,
                    MatDialogModule,
                    InfiniteScrollModule,
                    // AdminLayoutComponent
                    NgInit,
                    SafeHtmlPipe,
                    cfTemplateDirective,
                    NavigationComponent
                ],
                providers: [
                    { provide: Ability, useValue: ɵ0 },
                    { provide: PureAbility, useExisting: Ability },
                ]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL25neC1tYXRlcmlhbC13aWRnZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyw0REFBNEQ7QUFDNUQsaUZBQWlGO0FBQ2pGLDhFQUE4RTtBQUU5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUs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QUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixlQUFlO29CQUNmLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQixjQUFjO29CQUNkLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLG9CQUFvQjtvQkFDcEIsYUFBYTtvQkFDYixjQUFjO29CQUNkLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUV4QixpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsMEJBQTBCO29CQUMxQix1QkFBdUI7b0JBRXZCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLGFBQWE7b0JBQ2IsZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtvQkFDbEIsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUNwQix1QkFBdUI7b0JBQ3ZCLE1BQU07b0JBQ04sWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLElBQWUsRUFBRTtvQkFDN0MsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUU7aUJBQy9DO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG4vL2ltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbi8vaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuLy9pbXBvcnQgeyBOb29wQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7IExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xuaW1wb3J0IHsgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XG5pbXBvcnQgeyBNYXRDaGlwc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEJhZGdlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYmFkZ2UnO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbic7XG5pbXBvcnQgeyBNYXRTaWRlbmF2TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQgeyBNYXRCb3R0b21TaGVldE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2JvdHRvbS1zaGVldCdcbmltcG9ydCB7IE1hdERpdmlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaXZpZGVyJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG4vLyBpbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRNb21lbnREYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXInO1xuaW1wb3J0IHsgTWF0U2xpZGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbi8vaW1wb3J0IHsgTWF0RmlsZVVwbG9hZE1vZHVsZSB9IGZyb20gJ21hdC1maWxlLXVwbG9hZCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQgeyBNYXRUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFNvcnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IE1hdFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRHcmlkTGlzdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdCc7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLWJhcic7XG5pbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyJztcblxuLy9pbXBvcnQgeyBGcm9hbGFFZGl0b3JNb2R1bGUsIEZyb2FsYVZpZXdNb2R1bGUgfSBmcm9tICdhbmd1bGFyLWZyb2FsYS13eXNpd3lnJztcbi8vaW1wb3J0IHsgRWRpdG9yTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZWRpdG9yJztcblxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgQWJpbGl0eU1vZHVsZSB9IGZyb20gJ0BjYXNsL2FuZ3VsYXInO1xuaW1wb3J0IHsgQWJpbGl0eSwgUHVyZUFiaWxpdHkgfSBmcm9tICdAY2FzbC9hYmlsaXR5JztcblxuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ25nMi10b29sdGlwLWRpcmVjdGl2ZSc7XG5cbi8vaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi9jb21wb25lbnQvYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnOyBcbmltcG9ydCB7IEJ1dHRvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vY29tcG9uZW50L2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IENydWRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jcnVkL2NvbXBvbmVudC9jcnVkLWZvcm0vY3J1ZC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcnVkTGlzdENvbXBvbmVudCwgQm90dG9tU2VhcmNoU2hlZXQgfSBmcm9tICcuL2NydWQvY29tcG9uZW50L2NydWQtbGlzdC9jcnVkLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbGVVcGxvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvY29tcG9uZW50L2ZpbGUtdXBsb2FkZXIvZmlsZS11cGxvYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0aWNMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0L2NvbXBvbmVudC9zdGF0aWMtbGlzdC9zdGF0aWMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHluYW1pY0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QvY29tcG9uZW50L2R5bmFtaWMtbGlzdC9keW5hbWljLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC9jb21wb25lbnQvbW9kYWwvbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbkRlbGV0ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2NvbXBvbmVudC9idXR0b24tZGVsZXRlLWNvbmZpcm1hdGlvbi9idXR0b24tZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRtaW5MYXlvdXRDb21wb25lbnQgfSBmcm9tICcuL3BhZ2UvY29tcG9uZW50L2FkbWluLWxheW91dC9hZG1pbi1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QvY29tcG9uZW50L2xpc3QuY29tcG9uZW50JzsgXG5pbXBvcnQgeyBDcnVkSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jcnVkL2NvbXBvbmVudC9jcnVkLWhlYWRlci9jcnVkLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUNvbXBvbmVudCwgRm9ybUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS9jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3J1ZExpc3RDb21wb25lbnRJbnRlcmZhY2UgfSBmcm9tICcuL2NydWQvaW50ZXJmYWNlL2NydWQtbGlzdC9jcnVkLWxpc3QtaW50ZXJmYWNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBRdWlsbE1vZHVsZSB9IGZyb20gJ25neC1xdWlsbCc7XG5pbXBvcnQgeyBDaGlwc0NvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvY29tcG9uZW50L2NoaXBzL2NoaXBzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudC90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQgeyBNdWx0aUltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9jb21wb25lbnQvbXVsdGktaW1hZ2UvbXVsdGktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IFBhcmFncmFwaENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvY29tcG9uZW50L3BhcmFncmFwaC9wYXJhZ3JhcGguY29tcG9uZW50JztcbmltcG9ydCB7IEhpZ2hsaWdodFBpcGUgfSBmcm9tICcuL2ZpZWxkL3BpcGVzL2hpZ2hsaWdodFBpcGUnO1xuLy9pbXBvcnQgeyBEeW5hbWljTW9kdWxlIH0gZnJvbSAnbmctZHluYW1pYy1jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5maW5pdGVTY3JvbGxNb2R1bGUgfSBmcm9tICduZ3gtaW5maW5pdGUtc2Nyb2xsJztcbmltcG9ydCB7IE1kZVBvcG92ZXJNb2R1bGUgfSBmcm9tICdAbWF0ZXJpYWwtZXh0ZW5kZWQvbWRlJztcbmltcG9ydCB7IFRvb2x0aXBDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudC90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IE5nSW5pdCB9IGZyb20gJy4vbGlzdC9kaXJlY3RpdmVzL25nSW5pdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9saXN0L3BpcGVzL3NhZmVIdG1sLnBpcGUnO1xuaW1wb3J0IHsgY2ZUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdC9kaXJlY3RpdmVzL2NvbXBpbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vY29tcG9uZW50L25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgQnV0dG9uRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50LFxuICAgIENydWRIZWFkZXJDb21wb25lbnQsXG4gICAgQ3J1ZEZvcm1Db21wb25lbnQsXG4gICAgQ3J1ZExpc3RDb21wb25lbnQsXG4gICAgQ3J1ZExpc3RDb21wb25lbnRJbnRlcmZhY2UsXG4gICAgQm90dG9tU2VhcmNoU2hlZXQsXG4gICAgRmlsZVVwbG9hZGVyQ29tcG9uZW50LFxuICAgIEZpZWxkQ29tcG9uZW50LFxuICAgIC8vIEZpZWxkSG9yaXpvbnRhbExheW91dENvbXBvbmVudCxcbiAgICAvLyBGaWVsZFZlcnRpY2FsTGF5b3V0Q29tcG9uZW50LFxuICAgIC8vIEZpZWxkSW5saW5lTGF5b3V0Q29tcG9uZW50LFxuICAgIC8vIEZpZWxkTGF5b3V0Q29tcG9uZW50LFxuICAgIEZvcm1IZWFkZXJDb21wb25lbnQsXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBBZG1pbkxheW91dENvbXBvbmVudCwgXG4gICAgTGlzdENvbXBvbmVudCxcbiAgICBTdGF0aWNMaXN0Q29tcG9uZW50LFxuICAgIER5bmFtaWNMaXN0Q29tcG9uZW50LFxuICAgIE1vZGFsQ29tcG9uZW50LFxuICAgIENoaXBzQ29tcG9uZW50LFxuICAgIFRvb2xiYXJDb21wb25lbnQsXG4gICAgTXVsdGlJbWFnZUNvbXBvbmVudCxcbiAgICBQYXJhZ3JhcGhDb21wb25lbnQsXG4gICAgSGlnaGxpZ2h0UGlwZSxcbiAgICBUb29sdGlwQ29tcG9uZW50LFxuICAgIE5nSW5pdCxcbiAgICBTYWZlSHRtbFBpcGUsXG4gICAgY2ZUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOYXZpZ2F0aW9uQ29tcG9uZW50XG4gIF0sIFxuICBpbXBvcnRzOiBbXG4gICAgLy8gQnV0dG9uTW9kdWxlLFxuICAgIC8vIENydWRNb2R1bGUsXG4gICAgLy8gRmllbGRNb2R1bGUsXG4gICAgLy8gTGlzdE1vZHVsZSxcbiAgICAvLyBNb2RhbE1vZHVsZSxcbiAgICAvLyBOYXZpZ2F0aW9uTW9kdWxlLFxuICAgIC8vIFBhZ2VNb2R1bGUsXG4gICAgLy8gUHJpdmlsZWdlTW9kdWxlLCBcbiAgICAvLyBTZXR0aW5nTW9kdWxlXG4gICAgQ29tbW9uTW9kdWxlLFxuLy8gICAgQnJvd3Nlck1vZHVsZSxcbi8vICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuLy8gICAgTm9vcEFuaW1hdGlvbnNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4vLyAgICBEeW5hbWljTW9kdWxlLFxuICAgIE1kZVBvcG92ZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUb29sdGlwTW9kdWxlLFxuICAgIExheW91dE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0Q2hpcHNNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCYWRnZU1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdEJvdHRvbVNoZWV0TW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFJhZGlvTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TW9tZW50RGF0ZU1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRTb3J0TW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgLy8gRnJvYWxhRWRpdG9yTW9kdWxlLmZvclJvb3QoKSwgXG4gICAgLy8gRnJvYWxhVmlld01vZHVsZS5mb3JSb290KCksXG4gICAgLy8gICAgTWF0RmlsZVVwbG9hZE1vZHVsZSxcbiAgICAvLyBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgLy8gRWRpdG9yTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsXG4gICAgUXVpbGxNb2R1bGUuZm9yUm9vdCgpLFxuICAgIEFiaWxpdHlNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIEluZmluaXRlU2Nyb2xsTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBCdXR0b25Db21wb25lbnQsXG4gICAgQnV0dG9uR3JvdXBDb21wb25lbnQsXG4gICAgQ3J1ZExpc3RDb21wb25lbnRJbnRlcmZhY2UsXG4gICAgQ3J1ZEZvcm1Db21wb25lbnQsXG4gICAgQ3J1ZExpc3RDb21wb25lbnQsXG4gICAgRmlsZVVwbG9hZGVyQ29tcG9uZW50LFxuICAgIEZpZWxkQ29tcG9uZW50LFxuICAgIC8vIEZpZWxkSG9yaXpvbnRhbExheW91dENvbXBvbmVudCxcbiAgICAvLyBGaWVsZFZlcnRpY2FsTGF5b3V0Q29tcG9uZW50LFxuICAgIC8vIEZpZWxkSW5saW5lTGF5b3V0Q29tcG9uZW50LFxuICAgIC8vIEZpZWxkTGF5b3V0Q29tcG9uZW50LFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgRm9ybUhlYWRlckNvbXBvbmVudCxcbiAgICBTdGF0aWNMaXN0Q29tcG9uZW50LFxuICAgIER5bmFtaWNMaXN0Q29tcG9uZW50LFxuICAgIE1vZGFsQ29tcG9uZW50LFxuLy8gICAgRHluYW1pY01vZHVsZSxcbiAgICBNZGVQb3BvdmVyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRNb21lbnREYXRlTW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcblxuICAgIC8vIEZyb2FsYUVkaXRvck1vZHVsZS5mb3JSb290KCksIFxuICAgIC8vIEZyb2FsYVZpZXdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIC8vICAgIE1hdEZpbGVVcGxvYWRNb2R1bGUsXG4gICAgLy8gUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIC8vIEVkaXRvck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIEluZmluaXRlU2Nyb2xsTW9kdWxlLFxuICAgIC8vIEFkbWluTGF5b3V0Q29tcG9uZW50XG4gICAgTmdJbml0LFxuICAgIFNhZmVIdG1sUGlwZSxcbiAgICBjZlRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBBYmlsaXR5LCB1c2VWYWx1ZTogbmV3IEFiaWxpdHkoKSB9LFxuICAgIHsgcHJvdmlkZTogUHVyZUFiaWxpdHksIHVzZUV4aXN0aW5nOiBBYmlsaXR5IH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxXaWRnZXRNb2R1bGUgeyB9XG4iXX0=