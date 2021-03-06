/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2010 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#import "TiUIView.h"

@interface TiUISwitch : TiUIView <LayoutAutosizing> {
  @private
  UISwitch *switchView;
  BOOL firstInit;
  BOOL animated;
}

- (NSNumber *)value;

- (IBAction)switchChanged:(id)sender;

@end
