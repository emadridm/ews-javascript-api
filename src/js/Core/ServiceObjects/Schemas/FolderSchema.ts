import PolicyTag = require("../../../ComplexProperties/PolicyTag");
import ArchiveTag = require("../../../ComplexProperties/ArchiveTag");
import ManagedFolderInformation = require("../../../ComplexProperties/ManagedFolderInformation");
import PermissionSetPropertyDefinition = require("../../../PropertyDefinitions/PermissionSetPropertyDefinition");
import WellKnownFolderName = require("../../../Enumerations/WellKnownFolderName");
import ExchangeVersion = require("../../../Enumerations/ExchangeVersion");
import StringPropertyDefinition = require("../../../PropertyDefinitions/StringPropertyDefinition");
import IntPropertyDefinition = require("../../../PropertyDefinitions/IntPropertyDefinition");
import EffectiveRightsPropertyDefinition = require("../../../PropertyDefinitions/EffectiveRightsPropertyDefinition");
import GenericPropertyDefinition = require("../../../PropertyDefinitions/GenericPropertyDefinition");
import PropertyDefinition = require("../../../PropertyDefinitions/PropertyDefinition");
import PropertyDefinitionFlags = require("../../../Enumerations/PropertyDefinitionFlags");
import ComplexPropertyDefinition = require("../../../PropertyDefinitions/ComplexPropertyDefinition");
import XmlElementNames = require("../../XmlElementNames");
import FolderId = require("../../../ComplexProperties/FolderId");

import ServiceObjectSchema = require("./ServiceObjectSchema");

//module Microsoft.Exchange.WebServices.Data.FolderSchema {
module FieldUris {
  export var FolderId: string = "folder:FolderId";
  export var ParentFolderId: string = "folder:ParentFolderId";
  export var DisplayName: string = "folder:DisplayName";
  export var UnreadCount: string = "folder:UnreadCount";
  export var TotalCount: string = "folder:TotalCount";
  export var ChildFolderCount: string = "folder:ChildFolderCount";
  export var FolderClass: string = "folder:FolderClass";
  export var ManagedFolderInformation: string = "folder:ManagedFolderInformation";
  export var EffectiveRights: string = "folder:EffectiveRights";
  export var PermissionSet: string = "folder:PermissionSet";
  export var PolicyTag: string = "folder:PolicyTag";
  export var ArchiveTag: string = "folder:ArchiveTag";
  export var DistinguishedFolderId: string = "folder:DistinguishedFolderId";
}
//}


class FolderSchema extends ServiceObjectSchema {
  /* <summary>
  /// Field URIs for folders.
  /// </summary>*/

  static Id: PropertyDefinition = new ComplexPropertyDefinition<FolderId>(
    "Id",
    XmlElementNames.FolderId,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.FolderId,
    PropertyDefinitionFlags.CanFind,
    () => { return new FolderId(); });

  static FolderClass: PropertyDefinition = new StringPropertyDefinition(
    "FolderClass",
    XmlElementNames.FolderClass,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.FolderClass,
    PropertyDefinitionFlags.CanSet | PropertyDefinitionFlags.CanUpdate | PropertyDefinitionFlags.CanFind);

  static ParentFolderId: PropertyDefinition = new ComplexPropertyDefinition<FolderId>(
    "ParentFolderId",
    XmlElementNames.ParentFolderId,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.ParentFolderId,
    PropertyDefinitionFlags.CanFind,
    () => { return new FolderId(); });

  static ChildFolderCount: PropertyDefinition = new IntPropertyDefinition(
    "ChildFolderCount",
    XmlElementNames.ChildFolderCount,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.ChildFolderCount,
    PropertyDefinitionFlags.CanFind);


  static DisplayName: PropertyDefinition = new StringPropertyDefinition(
    "DisplayName",
    XmlElementNames.DisplayName,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.DisplayName,
    PropertyDefinitionFlags.CanSet | PropertyDefinitionFlags.CanUpdate | PropertyDefinitionFlags.CanDelete | PropertyDefinitionFlags.CanFind);

  static UnreadCount: PropertyDefinition = new IntPropertyDefinition(
    "UnreadCount",
    XmlElementNames.UnreadCount,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.UnreadCount,
    PropertyDefinitionFlags.CanFind);

  static TotalCount: PropertyDefinition = new IntPropertyDefinition(
    "TotalCount",
    XmlElementNames.TotalCount,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.TotalCount,
    PropertyDefinitionFlags.CanFind);

  static ManagedFolderInformation: PropertyDefinition = new ComplexPropertyDefinition<ManagedFolderInformation>(
    "ManagedFolderInformation",
    XmlElementNames.ManagedFolderInformation,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.ManagedFolderInformation,
    PropertyDefinitionFlags.CanFind,
    () => { return new ManagedFolderInformation(); });

  static EffectiveRights: PropertyDefinition = new EffectiveRightsPropertyDefinition(
    "EffectiveRights",
    XmlElementNames.EffectiveRights,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.EffectiveRights,
    PropertyDefinitionFlags.CanFind);

  static Permissions: PropertyDefinition = new PermissionSetPropertyDefinition(
    "Permissions",
    XmlElementNames.PermissionSet,
    ExchangeVersion.Exchange2007_SP1,
    FieldUris.PermissionSet,
    PropertyDefinitionFlags.AutoInstantiateOnRead | PropertyDefinitionFlags.CanSet | PropertyDefinitionFlags.CanUpdate | PropertyDefinitionFlags.CanDelete | PropertyDefinitionFlags.MustBeExplicitlyLoaded);

  static WellKnownFolderName: PropertyDefinition = new GenericPropertyDefinition<WellKnownFolderName>(
    "WellKnownFolderName",
    XmlElementNames.DistinguishedFolderId,
    ExchangeVersion.Exchange2013,
    FieldUris.DistinguishedFolderId,
    PropertyDefinitionFlags.CanFind);

  static PolicyTag: PropertyDefinition = new ComplexPropertyDefinition<PolicyTag>(
    "PolicyTag",
    XmlElementNames.PolicyTag,
    ExchangeVersion.Exchange2013,
    FieldUris.PolicyTag,
    PropertyDefinitionFlags.CanSet | PropertyDefinitionFlags.CanUpdate | PropertyDefinitionFlags.CanDelete | PropertyDefinitionFlags.CanFind,
    () => { return new PolicyTag(); });

  static ArchiveTag: PropertyDefinition = new ComplexPropertyDefinition<ArchiveTag>(
    "ArchiveTag",
    XmlElementNames.ArchiveTag,
    ExchangeVersion.Exchange2013,
    FieldUris.ArchiveTag,
    PropertyDefinitionFlags.CanSet | PropertyDefinitionFlags.CanUpdate | PropertyDefinitionFlags.CanDelete | PropertyDefinitionFlags.CanFind,
    () => { return new ArchiveTag(); });

  static Instance: FolderSchema = new FolderSchema();

  RegisterProperties(): void {

    super.RegisterProperties();

    this.RegisterProperty(FolderSchema.Id);
    this.RegisterProperty(FolderSchema.ParentFolderId);
    this.RegisterProperty(FolderSchema.FolderClass);
    this.RegisterProperty(FolderSchema.DisplayName);
    this.RegisterProperty(FolderSchema.TotalCount);
    this.RegisterProperty(FolderSchema.ChildFolderCount);
    this.RegisterProperty(ServiceObjectSchema.ExtendedProperties);
    this.RegisterProperty(FolderSchema.ManagedFolderInformation);
    this.RegisterProperty(FolderSchema.EffectiveRights);
    this.RegisterProperty(FolderSchema.Permissions);
    this.RegisterProperty(FolderSchema.UnreadCount);
    this.RegisterProperty(FolderSchema.WellKnownFolderName);
    this.RegisterProperty(FolderSchema.PolicyTag);
    this.RegisterProperty(FolderSchema.ArchiveTag);
  }
}

export = FolderSchema;


//module Microsoft.Exchange.WebServices.Data {
//}
//import _export = Microsoft.Exchange.WebServices.Data;
//export = _export;
