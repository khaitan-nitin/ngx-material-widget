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
import { FieldComponent, FieldHorizontalLayoutComponent, FieldVerticalLayoutComponent, FieldInlineLayoutComponent, FieldLayoutComponent } from './field/component';
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
export class AdminBuilderModule {
}
AdminBuilderModule.decorators = [
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
                    FieldHorizontalLayoutComponent,
                    FieldVerticalLayoutComponent,
                    FieldInlineLayoutComponent,
                    FieldLayoutComponent,
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
                    FormComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXdpZGdldC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL25neC1tYXRlcmlhbC13aWRnZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyw0REFBNEQ7QUFDNUQsaUZBQWlGO0FBQ2pGLDhFQUE4RTtBQUU5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUs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O29CQUNiLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsZ0JBQWdCO29CQUNoQixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxhQUFhO29CQUNiLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQixtQkFBbUI7b0JBQ25CLGVBQWU7b0JBQ2Ysb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGlCQUFpQjtvQkFDakIsb0JBQW9CO29CQUNwQix3QkFBd0I7b0JBRXhCLGlDQUFpQztvQkFDakMsOEJBQThCO29CQUM5QiwwQkFBMEI7b0JBQzFCLHVCQUF1QjtvQkFFdkIsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixhQUFhO29CQUNiLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLHVCQUF1QjtvQkFDdkIsTUFBTTtvQkFDTixZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsbUJBQW1CO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsSUFBZSxFQUFFO29CQUM3QyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRTtpQkFDL0M7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbi8vaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuLy9pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG4vL2ltcG9ydCB7IE5vb3BBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuaW1wb3J0IHsgTGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Ub2dnbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24tdG9nZ2xlJztcbmltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0QmFkZ2VNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9iYWRnZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZXhwYW5zaW9uJztcbmltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7IE1hdEJvdHRvbVNoZWV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0J1xuaW1wb3J0IHsgTWF0RGl2aWRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpdmlkZXInO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbi8vIGltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdE1vbWVudERhdGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC1tb21lbnQtYWRhcHRlcic7XG5pbXBvcnQgeyBNYXRTbGlkZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuLy9pbXBvcnQgeyBNYXRGaWxlVXBsb2FkTW9kdWxlIH0gZnJvbSAnbWF0LWZpbGUtdXBsb2FkJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdFRhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0U29ydE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdEdyaWRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZ3JpZC1saXN0JztcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuXG4vL2ltcG9ydCB7IEZyb2FsYUVkaXRvck1vZHVsZSwgRnJvYWxhVmlld01vZHVsZSB9IGZyb20gJ2FuZ3VsYXItZnJvYWxhLXd5c2l3eWcnO1xuLy9pbXBvcnQgeyBFZGl0b3JNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1lZGl0b3InO1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBBYmlsaXR5TW9kdWxlIH0gZnJvbSAnQGNhc2wvYW5ndWxhcic7XG5pbXBvcnQgeyBBYmlsaXR5LCBQdXJlQWJpbGl0eSB9IGZyb20gJ0BjYXNsL2FiaWxpdHknO1xuXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnbmcyLXRvb2x0aXAtZGlyZWN0aXZlJztcblxuLy9pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2NvbXBvbmVudC9idXR0b24vYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCdXR0b25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uL2NvbXBvbmVudC9idXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDcnVkRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY3J1ZC9jb21wb25lbnQvY3J1ZC1mb3JtL2NydWQtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3J1ZExpc3RDb21wb25lbnQsIEJvdHRvbVNlYXJjaFNoZWV0IH0gZnJvbSAnLi9jcnVkL2NvbXBvbmVudC9jcnVkLWxpc3QvY3J1ZC1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudC9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkQ29tcG9uZW50LCBGaWVsZEhvcml6b250YWxMYXlvdXRDb21wb25lbnQsIEZpZWxkVmVydGljYWxMYXlvdXRDb21wb25lbnQsIEZpZWxkSW5saW5lTGF5b3V0Q29tcG9uZW50LCBGaWVsZExheW91dENvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXRpY0xpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QvY29tcG9uZW50L3N0YXRpYy1saXN0L3N0YXRpYy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEeW5hbWljTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC9jb21wb25lbnQvZHluYW1pYy1saXN0L2R5bmFtaWMtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsL2NvbXBvbmVudC9tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnV0dG9uRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24vY29tcG9uZW50L2J1dHRvbi1kZWxldGUtY29uZmlybWF0aW9uL2J1dHRvbi1kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZG1pbkxheW91dENvbXBvbmVudCB9IGZyb20gJy4vcGFnZS9jb21wb25lbnQvYWRtaW4tbGF5b3V0L2FkbWluLWxheW91dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC9jb21wb25lbnQvbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3J1ZEhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vY3J1ZC9jb21wb25lbnQvY3J1ZC1oZWFkZXIvY3J1ZC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1Db21wb25lbnQsIEZvcm1IZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0vY29tcG9uZW50JztcbmltcG9ydCB7IENydWRMaXN0Q29tcG9uZW50SW50ZXJmYWNlIH0gZnJvbSAnLi9jcnVkL2ludGVyZmFjZS9jcnVkLWxpc3QvY3J1ZC1saXN0LWludGVyZmFjZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUXVpbGxNb2R1bGUgfSBmcm9tICduZ3gtcXVpbGwnO1xuaW1wb3J0IHsgQ2hpcHNDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudC9jaGlwcy9jaGlwcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9jb21wb25lbnQvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQge01hdFRvb2xiYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHsgTXVsdGlJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vZmllbGQvY29tcG9uZW50L211bHRpLWltYWdlL211bHRpLWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJhZ3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2ZpZWxkL2NvbXBvbmVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIaWdobGlnaHRQaXBlIH0gZnJvbSAnLi9maWVsZC9waXBlcy9oaWdobGlnaHRQaXBlJztcbi8vaW1wb3J0IHsgRHluYW1pY01vZHVsZSB9IGZyb20gJ25nLWR5bmFtaWMtY29tcG9uZW50JztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsTW9kdWxlIH0gZnJvbSAnbmd4LWluZmluaXRlLXNjcm9sbCc7XG5pbXBvcnQgeyBNZGVQb3BvdmVyTW9kdWxlIH0gZnJvbSAnQG1hdGVyaWFsLWV4dGVuZGVkL21kZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50IH0gZnJvbSAnLi9maWVsZC9jb21wb25lbnQvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ0luaXQgfSBmcm9tICcuL2xpc3QvZGlyZWN0aXZlcy9uZ0luaXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNhZmVIdG1sUGlwZSB9IGZyb20gJy4vbGlzdC9waXBlcy9zYWZlSHRtbC5waXBlJztcbmltcG9ydCB7IGNmVGVtcGxhdGVEaXJlY3RpdmUgfSBmcm9tICcuL2xpc3QvZGlyZWN0aXZlcy9jb21waWxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL2NvbXBvbmVudC9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIEJ1dHRvbkRlbGV0ZUNvbmZpcm1hdGlvbkNvbXBvbmVudCxcbiAgICBDcnVkSGVhZGVyQ29tcG9uZW50LFxuICAgIENydWRGb3JtQ29tcG9uZW50LFxuICAgIENydWRMaXN0Q29tcG9uZW50LFxuICAgIENydWRMaXN0Q29tcG9uZW50SW50ZXJmYWNlLFxuICAgIEJvdHRvbVNlYXJjaFNoZWV0LFxuICAgIEZpbGVVcGxvYWRlckNvbXBvbmVudCxcbiAgICBGaWVsZENvbXBvbmVudCxcbiAgICBGaWVsZEhvcml6b250YWxMYXlvdXRDb21wb25lbnQsXG4gICAgRmllbGRWZXJ0aWNhbExheW91dENvbXBvbmVudCxcbiAgICBGaWVsZElubGluZUxheW91dENvbXBvbmVudCxcbiAgICBGaWVsZExheW91dENvbXBvbmVudCxcbiAgICBGb3JtSGVhZGVyQ29tcG9uZW50LFxuICAgIEZvcm1Db21wb25lbnQsXG4gICAgQWRtaW5MYXlvdXRDb21wb25lbnQsIFxuICAgIExpc3RDb21wb25lbnQsXG4gICAgU3RhdGljTGlzdENvbXBvbmVudCxcbiAgICBEeW5hbWljTGlzdENvbXBvbmVudCxcbiAgICBNb2RhbENvbXBvbmVudCxcbiAgICBDaGlwc0NvbXBvbmVudCxcbiAgICBUb29sYmFyQ29tcG9uZW50LFxuICAgIE11bHRpSW1hZ2VDb21wb25lbnQsXG4gICAgUGFyYWdyYXBoQ29tcG9uZW50LFxuICAgIEhpZ2hsaWdodFBpcGUsXG4gICAgVG9vbHRpcENvbXBvbmVudCxcbiAgICBOZ0luaXQsXG4gICAgU2FmZUh0bWxQaXBlLFxuICAgIGNmVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmF2aWdhdGlvbkNvbXBvbmVudFxuICBdLCBcbiAgaW1wb3J0czogW1xuICAgIC8vIEJ1dHRvbk1vZHVsZSxcbiAgICAvLyBDcnVkTW9kdWxlLFxuICAgIC8vIEZpZWxkTW9kdWxlLFxuICAgIC8vIExpc3RNb2R1bGUsXG4gICAgLy8gTW9kYWxNb2R1bGUsXG4gICAgLy8gTmF2aWdhdGlvbk1vZHVsZSxcbiAgICAvLyBQYWdlTW9kdWxlLFxuICAgIC8vIFByaXZpbGVnZU1vZHVsZSwgXG4gICAgLy8gU2V0dGluZ01vZHVsZVxuICAgIENvbW1vbk1vZHVsZSxcbi8vICAgIEJyb3dzZXJNb2R1bGUsXG4vLyAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbi8vICAgIE5vb3BBbmltYXRpb25zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuLy8gICAgRHluYW1pY01vZHVsZSxcbiAgICBNZGVQb3BvdmVyTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgVG9vbHRpcE1vZHVsZSxcbiAgICBMYXlvdXRNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdENoaXBzTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QmFkZ2VNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRCb3R0b21TaGVldE1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE1vbWVudERhdGVNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIC8vIEZyb2FsYUVkaXRvck1vZHVsZS5mb3JSb290KCksIFxuICAgIC8vIEZyb2FsYVZpZXdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIC8vICAgIE1hdEZpbGVVcGxvYWRNb2R1bGUsXG4gICAgLy8gUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIC8vIEVkaXRvck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIFF1aWxsTW9kdWxlLmZvclJvb3QoKSxcbiAgICBBYmlsaXR5TW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBJbmZpbml0ZVNjcm9sbE1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQnV0dG9uQ29tcG9uZW50LFxuICAgIEJ1dHRvbkdyb3VwQ29tcG9uZW50LFxuICAgIENydWRMaXN0Q29tcG9uZW50SW50ZXJmYWNlLFxuICAgIENydWRGb3JtQ29tcG9uZW50LFxuICAgIENydWRMaXN0Q29tcG9uZW50LFxuICAgIEZpbGVVcGxvYWRlckNvbXBvbmVudCxcbiAgICBGaWVsZENvbXBvbmVudCxcbiAgICAvLyBGaWVsZEhvcml6b250YWxMYXlvdXRDb21wb25lbnQsXG4gICAgLy8gRmllbGRWZXJ0aWNhbExheW91dENvbXBvbmVudCwgXG4gICAgLy8gRmllbGRJbmxpbmVMYXlvdXRDb21wb25lbnQsXG4gICAgRm9ybUNvbXBvbmVudCxcbiAgICBTdGF0aWNMaXN0Q29tcG9uZW50LFxuICAgIER5bmFtaWNMaXN0Q29tcG9uZW50LFxuICAgIE1vZGFsQ29tcG9uZW50LFxuLy8gICAgRHluYW1pY01vZHVsZSxcbiAgICBNZGVQb3BvdmVyTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRDaGlwc01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEJhZGdlTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0Qm90dG9tU2hlZXRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRNb21lbnREYXRlTW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFNvcnRNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcblxuICAgIC8vIEZyb2FsYUVkaXRvck1vZHVsZS5mb3JSb290KCksIFxuICAgIC8vIEZyb2FsYVZpZXdNb2R1bGUuZm9yUm9vdCgpLFxuICAgIC8vICAgIE1hdEZpbGVVcGxvYWRNb2R1bGUsXG4gICAgLy8gUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIC8vIEVkaXRvck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGl2aWRlck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIEluZmluaXRlU2Nyb2xsTW9kdWxlLFxuICAgIC8vIEFkbWluTGF5b3V0Q29tcG9uZW50XG4gICAgTmdJbml0LFxuICAgIFNhZmVIdG1sUGlwZSxcbiAgICBjZlRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5hdmlnYXRpb25Db21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBBYmlsaXR5LCB1c2VWYWx1ZTogbmV3IEFiaWxpdHkoKSB9LFxuICAgIHsgcHJvdmlkZTogUHVyZUFiaWxpdHksIHVzZUV4aXN0aW5nOiBBYmlsaXR5IH0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5CdWlsZGVyTW9kdWxlIHsgfVxuIl19