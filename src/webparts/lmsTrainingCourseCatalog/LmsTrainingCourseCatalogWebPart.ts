import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'LmsTrainingCourseCatalogWebPartStrings';
import LmsTrainingCourseCatalog from './components/LmsTrainingCourseCatalog';

export interface ILmsTrainingCourseCatalogWebPartProps {
  description: string;
  heading1: string;
  heading2: string;
  listName: string;
  visibleSections: string;
  showViewAllLinks: boolean;
  // upcomingCoursesTimeWindow: string;
  ItemsToShow: string;
}

export default class LmsTrainingCourseCatalogWebPart extends BaseClientSideWebPart<ILmsTrainingCourseCatalogWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const propPane = {
      heading1: this.properties?.heading1 || "General Safety Courses",
      heading2: this.properties?.heading2 || "Professional Development Courses",
      listName: this.properties?.listName || "Courses",
      visibleSections: this.properties?.visibleSections || "both",
      // upcomingCoursesTimeWindow: +(this.properties?.upcomingCoursesTimeWindow || "7"),
      ItemsToShow: this.properties?.ItemsToShow || "4",
      showViewAllLinks: typeof this.properties?.showViewAllLinks == "boolean" ? this.properties?.showViewAllLinks : false,
    }
    const element: React.ReactElement<any> = React.createElement(
      LmsTrainingCourseCatalog,
      {
        propPane,
        spContext: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Webpart Configuration",
              groupFields: [
                PropertyPaneTextField('heading1', {
                  label: 'Heading 1',
                  value: 'General Safety Courses'
                }),
                PropertyPaneTextField('heading2', {
                  label: 'Heading 2',
                  value: 'Professional Development Courses'
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  value: 'Courses'
                }),
                // PropertyPaneTextField('upcomingCoursesTimeWindow', {
                //   label: 'Upcoming Courses Time Window (days)',
                //   value: '7'
                // }),
                PropertyPaneDropdown('ItemsToShow', {
                  label: 'Items to Show',
                  options: [
                    { key: 'all', text: 'All items' },
                    ...Array.from({ length: 100 }, (_, i) => ({ key: i + 1, text: (i + 1).toString() }))
                  ]
                }),
                PropertyPaneDropdown('visibleSections', {
                  label: 'Visible Sections',
                  options: [
                    { key: 'both', text: 'Both' },
                    { key: 'sec1', text: 'First Section' },
                    { key: 'sec2', text: 'Second Section' },
                  ]
                }),
                PropertyPaneToggle('showViewAllLinks', {
                  label: 'Show "View all" links',
                  onText: 'On',
                  offText: 'Off'
                }),
                // PropertyPaneToggle('showAllCourses', {
                //   label: 'Show All Courses',
                //   onText: 'On',
                //   offText: 'Off'
                // })
              ]
            }
          ]
        }
      ]
    };
  }
}
