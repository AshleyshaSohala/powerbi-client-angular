// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { Embed, factories, service } from 'powerbi-client';

/**
 * Type for event handler function of embedded entity
 */
 export type EventHandler = (
  event?: service.ICustomEvent<any>,
  embeddedEntity?: Embed
) => void | null;

@Component({
  selector: 'powerbi-embed',
  template: '',
})

/**
 * Base component to hold common properties for all the Power BI entities
 *
 */
export class PowerBIEmbedComponent implements OnInit, OnChanges {
  // Input() specify the properties that will be passed from the parent
  // CSS class to be set on the embedding container (Optional)
  @Input()
  cssClassName?: string;

  // Provide a custom implementation of Power BI service (Optional)
  @Input()
  service?: service.Service;

  // Power BI service
  powerbi!: service.Service;

  ngOnInit(): void {
    // Initialize powerbi variable for child component
    if (this.service) {
      this.powerbi = this.service;
    } else {
      this.powerbi = new service.Service(
        factories.hpmFactory,
        factories.wpmpFactory,
        factories.routerFactory
      );
    }
   }

  ngOnChanges(changes: SimpleChanges): void { }
}
