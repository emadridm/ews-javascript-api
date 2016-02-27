﻿import {XmlElementNames} from "../../XmlElementNames";
import {ServiceErrorHandling} from "../../../Enumerations/ServiceErrorHandling";
import {IPromise} from "../../../Interfaces";
import {Strings} from "../../../Strings";
import {ServiceVersionException} from "../../../Exceptions/ServiceVersionException";
import {ItemAttachment} from "../../../ComplexProperties/ItemAttachment";
import {ItemId} from "../../../ComplexProperties/ItemId";
import {MimeContent} from "../../../ComplexProperties/MimeContent";
import {FolderId} from "../../../ComplexProperties/FolderId";
import {Sensitivity} from "../../../Enumerations/Sensitivity";
import {Attachment} from "../../../ComplexProperties/Attachment";
import {AttachmentCollection} from "../../../ComplexProperties/AttachmentCollection";
import {StringList} from "../../../ComplexProperties/StringList";
import {Importance} from "../../../Enumerations/Importance";
import {InternetMessageHeaderCollection} from "../../../ComplexProperties/InternetMessageHeaderCollection";
import {ResponseActions} from "../../../Enumerations/ResponseActions";
import {MessageBody} from "../../../ComplexProperties/MessageBody";
import {ExtendedPropertyCollection} from "../../../ComplexProperties/ExtendedPropertyCollection";
import {EffectiveRights} from "../../../Enumerations/EffectiveRights";
import {ConversationId} from "../../../ComplexProperties/ConversationId";
import {UniqueBody} from "../../../ComplexProperties/UniqueBody";
import {Flag} from "../../../ComplexProperties/Flag";
import {NormalizedBody} from "../../../ComplexProperties/NormalizedBody";
import {EntityExtractionResult} from "../../../ComplexProperties/EntityExtractionResult";
import {PolicyTag} from "../../../ComplexProperties/PolicyTag";
import {ArchiveTag} from "../../../ComplexProperties/ArchiveTag";
import {TextBody} from "../../../ComplexProperties/TextBody";
import {IconIndex} from "../../../Enumerations/IconIndex";
import {AffectedTaskOccurrence} from "../../../Enumerations/AffectedTaskOccurrence";
import {SendCancellationsMode} from "../../../Enumerations/SendCancellationsMode";
import {SendInvitationsMode} from "../../../Enumerations/SendInvitationsMode";
import {SendInvitationsOrCancellationsMode} from "../../../Enumerations/SendInvitationsOrCancellationsMode";
import {ExchangeService} from "../../ExchangeService";
import {EwsLogging} from "../../EwsLogging";
import {PropertySet} from "../../PropertySet";
import {WellKnownFolderName} from "../../../Enumerations/WellKnownFolderName";
import {DeleteMode} from "../../../Enumerations/DeleteMode";
import {PropertyDefinition} from "../../../PropertyDefinitions/PropertyDefinition";
import {ExchangeVersion} from "../../../Enumerations/ExchangeVersion";
import {ServiceObjectSchema} from "../Schemas/ServiceObjectSchema";
import {MessageDisposition} from "../../../Enumerations/MessageDisposition";
import {ConflictResolutionMode} from "../../../Enumerations/ConflictResolutionMode";
import {ExtendedPropertyDefinition} from "../../../PropertyDefinitions/ExtendedPropertyDefinition";
import {ItemSchema} from "../Schemas/ItemSchema";
import {IOutParam} from "../../../Interfaces/IOutParam";
import {StringHelper, ArrayHelper} from "../../../ExtensionMethods";
import {PromiseFactory} from "../../../PromiseFactory";
import {TypeContainer} from "../../../TypeContainer";

import {ServiceObject} from "../ServiceObject";
/**
 * Represents a generic **Item**. Properties available on items are defined in the *ItemSchema* class.
 *
 */
export class Item extends ServiceObject {

    private parentAttachment: ItemAttachment = null;
    
    /**
     * @internal Gets the parent attachment of this item.
     *
     */
    get ParentAttachment(): ItemAttachment {
        return this.parentAttachment;
    }
    
    /**
     * @internal Gets Id of the root item for this item.
     *
     */
    get RootItemId(): ItemId {
        if (this.IsAttachment && this.ParentAttachment.Owner !== null) {
            return this.ParentAttachment.Owner.RootItemId;
        }
        return this.Id;
    }
    
    /**
     * Gets a value indicating whether the item is an attachment.
     *
     */
    get IsAttachment(): boolean { return this.parentAttachment != null && typeof this.parentAttachment !== 'undefined' }
    
    /**
     * Gets a value indicating whether this object is a real store item, or if it's a local object that has yet to be saved.
     *
     */
    get IsNew(): boolean {
        // Item attachments don't have an Id, need to check whether the
        // parentAttachment is new or not.
        if (this.IsAttachment) {
            return this.ParentAttachment.IsNew;
        }
        else {
            var id = this.GetId();
            return id == null ? true : !id.IsValid;
        }
    }
    
    /**
     * Gets the Id of this item.
     *
     */
    get Id(): ItemId { return this.PropertyBag._getItem(this.GetIdPropertyDefinition()); }

    
    /**
     * Get or sets the MIME content of this item.
     *
     */
    get MimeContent(): MimeContent {
        return <MimeContent>this.PropertyBag._getItem(ItemSchema.MimeContent);
    }
    set MimeContent(value: MimeContent) {
        this.PropertyBag._setItem(ItemSchema.MimeContent, value);
    }
    
    /**
     * Gets the Id of the parent folder of this item.
     *
     */
    get ParentFolderId(): FolderId {
        return <FolderId>this.PropertyBag._getItem(ItemSchema.ParentFolderId);
    }
    
    /**
     * Gets or sets the sensitivity of this item.
     *
     */
    get Sensitivity(): Sensitivity {
        return <Sensitivity>this.PropertyBag._getItem(ItemSchema.Sensitivity);
    }
    set Sensitivity(value: Sensitivity) {
        this.PropertyBag._setItem(ItemSchema.Sensitivity, value);
    }
    
    /**
     * Gets a list of the attachments to this item.
     *
     */
    get Attachments(): AttachmentCollection {
        return <AttachmentCollection>this.PropertyBag._getItem(ItemSchema.Attachments);
    }
    
    /**
     * Gets the time when this item was received.
     *
     */
    get DateTimeReceived(): Date {
        return <Date>this.PropertyBag._getItem(ItemSchema.DateTimeReceived);
    }
    
    /**
     * Gets the size of this item.
     *
     */
    get Size(): number {
        return <number>this.PropertyBag._getItem(ItemSchema.Size);
    }
    
    /**
     * Gets or sets the list of categories associated with this item.
     *
     */
    get Categories(): StringList {
        return <StringList>this.PropertyBag._getItem(ItemSchema.Categories);
    }
    set Categories(value: StringList) {
        this.PropertyBag._setItem(ItemSchema.Categories, value);
    }
    
    /**
     * Gets or sets the culture associated with this item.
     *
     */
    get Culture(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.Culture);
    }
    set Culture(value: string) {
        this.PropertyBag._setItem(ItemSchema.Culture, value);
    }
    
    /**
     * Gets or sets the importance of this item.
     *
     */
    get Importance(): Importance {
        return <Importance>this.PropertyBag._getItem(ItemSchema.Importance);
    }
    set Importance(value: Importance) {
        this.PropertyBag._setItem(ItemSchema.Importance, value);
    }
    
    /**
     * Gets or sets the In-Reply-To reference of this item.
     *
     */
    get InReplyTo(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.InReplyTo);
    }
    set InReplyTo(value: string) {
        this.PropertyBag._setItem(ItemSchema.InReplyTo, value);
    }
    
    /**
     * Gets a value indicating whether the message has been submitted to be sent.
     *
     */
    get IsSubmitted(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsSubmitted);
    }
    
    /**
     * Gets a value indicating whether this is an associated item.
     *
     */
    get IsAssociated(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsAssociated);
    }
    
    /**
     * Gets a value indicating whether the item is is a draft. An item is a draft when it has not yet been sent.
     *
     */
    get IsDraft(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsDraft);
    }
    
    /**
     * Gets a value indicating whether the item has been sent by the current authenticated user.
     *
     */
    get IsFromMe(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsFromMe);
    }
    
    /**
     * Gets a value indicating whether the item is a resend of another item.
     *
     */    
    get IsResend(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsResend);
    }
    
    /**
     * Gets a value indicating whether the item has been modified since it was created.
     *
     */    
    get IsUnmodified(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsUnmodified);
    }
    
    /**
     * Gets a list of Internet headers for this item.
     *
     */    
    get InternetMessageHeaders(): InternetMessageHeaderCollection {
        return <InternetMessageHeaderCollection>this.PropertyBag._getItem(ItemSchema.InternetMessageHeaders);
    }
    
    /**
     * Gets the date and time this item was sent.
     *
     */    
    get DateTimeSent(): Date {
        return <Date>this.PropertyBag._getItem(ItemSchema.DateTimeSent);
    }
    
    /**
     * Gets the date and time this item was created.
     *
     */    
    get DateTimeCreated(): Date {
        return <Date>this.PropertyBag._getItem(ItemSchema.DateTimeCreated);
    }
    
    /**
     * Gets a value indicating which response actions are allowed on this item. Examples of response actions are Reply and Forward.
     *
     */    
    get AllowedResponseActions(): ResponseActions {
        return <ResponseActions>this.PropertyBag._getItem(ItemSchema.AllowedResponseActions);
    }
    
    /**
     * Gets or sets the date and time when the reminder is due for this item.
     *
     */    
    get ReminderDueBy(): Date {
        return <Date>this.PropertyBag._getItem(ItemSchema.ReminderDueBy);
    }
    set ReminderDueBy(value: Date) {
        this.PropertyBag._setItem(ItemSchema.ReminderDueBy, value);
    }
    
    /**
     * Gets or sets a value indicating whether a reminder is set for this item.
     *
     */    
    get IsReminderSet(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.IsReminderSet);
    }
    set IsReminderSet(value: boolean) {
        this.PropertyBag._setItem(ItemSchema.IsReminderSet, value);
    }
    
    /**
     * Gets or sets the number of minutes before the start of this item when the reminder should be triggered.
     *
     */    
    get ReminderMinutesBeforeStart(): number {
        return <number>this.PropertyBag._getItem(ItemSchema.ReminderMinutesBeforeStart);
    }
    set ReminderMinutesBeforeStart(value: number) {
        this.PropertyBag._setItem(ItemSchema.ReminderMinutesBeforeStart, value);
    }
    
    /**
     * Gets a text summarizing the Cc receipients of this item.
     *
     */    
    get DisplayCc(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.DisplayCc);
    }
    
    /**
     * Gets a text summarizing the To recipients of this item.
     *
     */    
    get DisplayTo(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.DisplayTo);
    }
    
    /**
     * Gets a value indicating whether the item has attachments.
     *
     */    
    get HasAttachments(): boolean {
        return <boolean>this.PropertyBag._getItem(ItemSchema.HasAttachments);
    }
    
    /**
     * Gets or sets the body of this item.
     *
     */    
    get Body(): MessageBody {
        return <MessageBody>this.PropertyBag._getItem(ItemSchema.Body);
    }
    set Body(value: MessageBody) {
        this.PropertyBag._setItem(ItemSchema.Body, value);
    }
    
    /**
     * Gets or sets the custom class name of this item.
     *
     */    
    get ItemClass(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.ItemClass);
    }
    set ItemClass(value: string) {
        this.PropertyBag._setItem(ItemSchema.ItemClass, value);
    }
    
    /**
     * Gets or sets the subject of this item.
     *
     */    
    get Subject(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.Subject);
    }
    set Subject(value: string) {
        this.SetSubject(value);
    }
    
    /**
     * Gets the query string that should be appended to the Exchange Web client URL to open this item using the appropriate read form in a web browser.
     *
     */    
    get WebClientReadFormQueryString(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.WebClientReadFormQueryString);
    }
    
    /**
     * Gets the query string that should be appended to the Exchange Web client URL to open this item using the appropriate edit form in a web browser.
     *
     */    
    get WebClientEditFormQueryString(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.WebClientEditFormQueryString);
    }
    
    /**
     * Gets a list of extended properties defined on this item.
     *
     */    
    get ExtendedProperties(): ExtendedPropertyCollection {
        return <ExtendedPropertyCollection>this.PropertyBag._getItem(ServiceObjectSchema.ExtendedProperties);
    }
    
    /**
     * Gets a value indicating the effective rights the current authenticated user has on this item.
     *
     */    
    get EffectiveRights(): EffectiveRights {
        return <EffectiveRights>this.PropertyBag._getItem(ItemSchema.EffectiveRights);
    }
    
    /**
     * Gets the name of the user who last modified this item.
     *
     */    
    get LastModifiedName(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.LastModifiedName);
    }
    
    /**
     * Gets the date and time this item was last modified.
     *
     */    
    get LastModifiedTime(): Date {
        return <Date>this.PropertyBag._getItem(ItemSchema.LastModifiedTime);
    }
    
    /**
     * Gets the Id of the conversation this item is part of.
     *
     */    
    get ConversationId(): ConversationId {
        return <ConversationId>this.PropertyBag._getItem(ItemSchema.ConversationId);
    }
    
    /**
     * Gets the body part that is unique to the conversation this item is part of.
     *
     */    
    get UniqueBody(): UniqueBody {
        return <UniqueBody>this.PropertyBag._getItem(ItemSchema.UniqueBody);
    }
    
    /**
     * Gets the store entry id.
     *
     */    
    get StoreEntryId(): number[] {
        return <number[]>this.PropertyBag._getItem(ItemSchema.StoreEntryId);
    }
    
    /**
     * Gets the item instance key.
     *
     */    
    get InstanceKey(): number[] {
        return <number[]>this.PropertyBag._getItem(ItemSchema.InstanceKey);
    }
    
    /**
     * Get or set the Flag value for this item.
     *
     */    
    get Flag(): Flag {
        return <Flag>this.PropertyBag._getItem(ItemSchema.Flag);
    }
    set Flag(value: Flag) {
        this.PropertyBag._setItem(ItemSchema.Flag, value);
    }
    
    /**
     * Gets the normalized body of the item.
     *
     */    
    get NormalizedBody(): NormalizedBody {
        return <NormalizedBody>this.PropertyBag._getItem(ItemSchema.NormalizedBody);
    }
    
    /**
     * Gets the EntityExtractionResult of the item.
     *
     */    
    get EntityExtractionResult(): EntityExtractionResult {
        return <EntityExtractionResult>this.PropertyBag._getItem(ItemSchema.EntityExtractionResult);
    }
    
    /**
     * Gets or sets the policy tag.
     *
     */    
    get PolicyTag(): PolicyTag {
        return <PolicyTag>this.PropertyBag._getItem(ItemSchema.PolicyTag);
    }
    set PolicyTag(value: PolicyTag) {
        this.PropertyBag._setItem(ItemSchema.PolicyTag, value);
    }
    
    /**
     * Gets or sets the archive tag.
     *
     */    
    get ArchiveTag(): ArchiveTag {
        return <ArchiveTag>this.PropertyBag._getItem(ItemSchema.ArchiveTag);
    }
    set ArchiveTag(value: ArchiveTag) {
        this.PropertyBag._setItem(ItemSchema.ArchiveTag, value);
    }
    
    /**
     * Gets the retention date.
     *
     */    
    get RetentionDate(): Date { //Nullable
        return <Date>this.PropertyBag._getItem(ItemSchema.RetentionDate);
    }
    
    /**
     * Gets the item Preview.
     *
     */    
    get Preview(): string {
        return <string>this.PropertyBag._getItem(ItemSchema.Preview);
    }
    
    /**
     * Gets the text body of the item.
     *
     */    
    get TextBody(): TextBody {
        return <TextBody>this.PropertyBag._getItem(ItemSchema.TextBody);
    }
    
    /**
     * Gets the icon index.
     *
     */    
    get IconIndex(): IconIndex {
        return <IconIndex>this.PropertyBag._getItem(ItemSchema.IconIndex);
    }
    
    /**
     * @internal Gets the default setting for how to treat affected task occurrences on Delete.
     * Subclasses will override this for different default behavior.
     *
     */    
    get DefaultAffectedTaskOccurrences(): AffectedTaskOccurrence { //nullable
        return null;
    }
    
    /**
     * @internal Gets the default setting for sending cancellations on Delete.
     * Subclasses will override this for different default behavior.
     *
     */    
    get DefaultSendCancellationsMode(): SendCancellationsMode {//nullable
        return null;
    }
    
    /**
     * @internal Gets the default settings for sending invitations on Save.
     * Subclasses will override this for different default behavior.
     *
     */    
    get DefaultSendInvitationsMode(): SendInvitationsMode {//nullable
        return null;
    }
    
    /**
     * @internal Gets the default settings for sending invitations or cancellations on Update.
     * Subclasses will override this for different default behavior.
     *
     */    
    get DefaultSendInvitationsOrCancellationsMode(): SendInvitationsOrCancellationsMode {//nullable
        return null;
    }
    
    /**
     * @internal Initializes an unsaved local instance of *Item*. To bind to an existing item, use **Item.Bind()** instead.
     *
     * @param   {ExchangeService}   service   The ExchangeService object to which the item will be bound.
     */
    constructor(svc: ExchangeService);
    /**
     * @internal Initializes a new instance of the  *Item* class. To bind to an existing item, use **Item.Bind()** instead
     *
     * @param   {ItemAttachment}   parentAttachment   The parent attachment.
     */
    constructor(parentAttachment: ItemAttachment);    
    /**
     * @internal ~~**used for super call, easier to manage, do not use in Actual code. //todo:fix - [ ] remove from d.ts file**~~.
     *
     * @param   {ExchangeService | ItemAttachment}   service   The ExchangeService object to which the item will be bound.
     */
    constructor(obj: ExchangeService | ItemAttachment)
    constructor(obj: ExchangeService | ItemAttachment) {        
        super(obj instanceof TypeContainer.ExchangeService ? <ExchangeService>obj: obj instanceof TypeContainer.ItemAttachment? (<ItemAttachment>obj).Service : null);//info: cannot check instanceof to avoid circular dependency in js. TypeContainer is workaround 

        if (obj instanceof TypeContainer.ItemAttachment) {
            var parentAttachment = obj;
            EwsLogging.Assert(
                parentAttachment != null,
                "Item.ctor",
                "parentAttachment is null");

            this.parentAttachment = <ItemAttachment>parentAttachment;
        }
    }
    
    /**
     * Binds to an existing item, whatever its actual type is, and loads the specified set of properties. Calling this method results in a call to EWS.
     *
     * @param   {ExchangeService}   service         The service to use to bind to the item.
     * @param   {ItemId}            id              The Id of the item to bind to.
     * @return  {IPromise<Item>}                    An Item instance representing the item corresponding to the specified Id :Promise.
     */
    Bind(service: ExchangeService, id: ItemId): IPromise<Item>;
    /**
     * Binds to an existing item, whatever its actual type is, and loads the specified set of properties. Calling this method results in a call to EWS.
     *
     * @param   {ExchangeService}   service         The service to use to bind to the item.
     * @param   {ItemId}            id              The Id of the item to bind to.
     * @param   {PropertySet}       propertySet     The set of properties to load.
     * @return  {IPromise<Item>}                    An Item instance representing the item corresponding to the specified Id :Promise.
     */    
    Bind(service: ExchangeService, id: ItemId, propertySet: PropertySet): IPromise<Item>;
    Bind(service: ExchangeService, id: ItemId, propertySet: PropertySet = PropertySet.FirstClassProperties): IPromise<Item> {
        return service.BindToItem<Item>(id, propertySet, Item);
    }
    
    /**
     * Creates a copy of this item in the specified folder. Calling this method results in a call to EWS.
     * 
     * Copy returns null if the copy operation is across two mailboxes or between a mailbox and a public folder.
     *
     * @param   {WellKnownFolderName}   destinationFolderName   The name of the folder in which to create a copy of this item.
     * @return  {IPromise<Item>}                                The copy of this item :Promise.
     */
    Copy(destinationFolderName: WellKnownFolderName): IPromise<Item>;
    /**
     * Creates a copy of this item in the specified folder. Calling this method results in a call to EWS.
     *
     *  Copy returns null if the copy operation is across two mailboxes or between a mailbox and a public folder.
     *
     * @param   {FolderId}          destinationFolderId   The Id of the folder in which to create a copy of this item.
     * @return  {IPromise<Item>}                          The copy of this item :Promise.
     */
    Copy(destinationFolderId: FolderId): IPromise<Item>;
    Copy(destinationFolderIdOrName: FolderId| WellKnownFolderName): IPromise<Item> {
        this.ThrowIfThisIsNew();
        this.ThrowIfThisIsAttachment();

        var folderId: FolderId = null;
        if (destinationFolderIdOrName instanceof FolderId) {
            folderId = destinationFolderIdOrName;
        }
        else {
            folderId = new FolderId(<WellKnownFolderName>destinationFolderIdOrName);
        }
        //todo: EwsUtilities.ValidateParam(destinationFolderId, "destinationFolderId");

        return this.Service.CopyItem(this.Id, folderId);
    }

    /**
     * Deletes the item. Calling this method results in a call to EWS.
     *
     * @param   {DeleteMode}   deleteMode             The deletion mode.
     */
    Delete(deleteMode: DeleteMode): IPromise<void>
    /**
     * Deletes the item. Calling this method results in a call to EWS.
     *
     * @param   {DeleteMode}   deleteMode             The deletion mode.
     * @param   {boolean}   suppressReadReceipts   Whether to suppress read receipts
     */
    Delete(deleteMode: DeleteMode, suppressReadReceipts: boolean): IPromise<void>
    Delete(deleteMode: DeleteMode, suppressReadReceipts: boolean = false): IPromise<void> { return this.InternalDelete(deleteMode, null, null, suppressReadReceipts); }

    /**
     * @internal Gets a list of extended properties defined on this object.
     *
     * @return  {ExtendedPropertyCollection}      Extended properties collection.
     */
    GetExtendedProperties(): ExtendedPropertyCollection { return this.ExtendedProperties; }
    
    /**
     * @inrtnal The property definition for the Id of this object.
     *
     * @return  {PropertyDefinition}      A PropertyDefinition instance.
     */
    GetIdPropertyDefinition(): PropertyDefinition { return ItemSchema.Id; }
    
    /**
     * Gets a value indicating whether a time zone SOAP header should be emitted in a CreateItem or UpdateItem request so this item can be property saved or updated.
     *
     * @param   {boolean}   isUpdateOperation   Indicates whether the operation being petrformed is an update operation.
     * @return  {boolean}                       true if a time zone SOAP header should be emitted; otherwise, false.
     */
    GetIsTimeZoneHeaderRequired(isUpdateOperation: boolean): boolean {
        // Starting E14SP2, attachment will be sent along with CreateItem requests. 
        // if the attachment used to require the Timezone header, CreateItem request should do so too.
        //
        debugger;//filtering of specific type needed.
        if (!isUpdateOperation &&
            (this.Service.RequestedServerVersion >= ExchangeVersion.Exchange2010_SP2)) {
            for (var itemAttachment of ArrayHelper.OfType<ItemAttachment, Attachment>(this.Attachments.Items, (a) => a instanceof TypeContainer.ItemAttachment))//.OfType<ItemAttachment>()) //info: cannot check instanceof to avoid circular dependency in js. TypeContainer is workaround
            {
                if ((itemAttachment.Item != null) && itemAttachment.Item.GetIsTimeZoneHeaderRequired(false /* isUpdateOperation */)) {
                    return true;
                }
            }
        }

        return super.GetIsTimeZoneHeaderRequired(isUpdateOperation);
    }
    
    /**
     * @internal Gets the minimum required server version.
     *
     * @return  {ExchangeVersion}      Earliest Exchange version in which this service object type is supported.
     */
    GetMinimumRequiredServerVersion(): ExchangeVersion { return ExchangeVersion.Exchange2007_SP1; }
    
    /**
     * @internal Internal method to return the schema associated with this type of object.
     *
     * @return  {ServiceObjectSchema}      The schema associated with this type of object.
     */
    GetSchema(): ServiceObjectSchema { return ItemSchema.Instance; }
    
    /**
     * @internal Gets the element name of item in XML
     * 
     * @return  {string} name of elelment
     */
    GetXmlElementName(): string { return XmlElementNames.Item; }
    
    /**
     * @internal Gets a value indicating whether this instance has unprocessed attachment collection changes.
     *
     * @return  {boolean}      true or false.
     * 
     */
    HasUnprocessedAttachmentChanges(): boolean { return this.Attachments.HasUnprocessedChanges(); }
    
    /**
     * @internal Create item.
     *
     * @param   {FolderId}              parentFolderId        The parent folder id.
     * @param   {MessageDisposition}    messageDisposition    The message disposition.
     * @param   {SendInvitationsMode}   sendInvitationsMode   The send invitations mode.
     */
    InternalCreate(parentFolderId: FolderId, messageDisposition: MessageDisposition, sendInvitationsMode: SendInvitationsMode): IPromise<void> {
        this.ThrowIfThisIsNotNew();
        this.ThrowIfThisIsAttachment();

        if (this.IsNew || this.IsDirty) {
            return this.Service.CreateItem(
                this,
                parentFolderId,
                messageDisposition,
                sendInvitationsMode !== null ? sendInvitationsMode : this.DefaultSendInvitationsMode)
                .then((response) => {
                    return this.Attachments.Save();
                });
        }
        return;
    }

    /**
     * @internal Deletes the object.
     *
     * @param   {DeleteMode}                deleteMode                The deletion mode.
     * @param   {SendCancellationsMode}     sendCancellationsMode     Indicates whether meeting cancellation messages should be sent.
     * @param   {AffectedTaskOccurrence}    affectedTaskOccurrences   Indicate which occurrence of a recurring task should be deleted.
     */
    InternalDelete(deleteMode: DeleteMode, sendCancellationsMode: SendCancellationsMode, affectedTaskOccurrences: AffectedTaskOccurrence): IPromise<void>;
    /**
     * @internal Deletes the object.
     *
     * @param   {DeleteMode}                deleteMode                The deletion mode.
     * @param   {SendCancellationsMode}     sendCancellationsMode     Indicates whether meeting cancellation messages should be sent.
     * @param   {AffectedTaskOccurrence}    affectedTaskOccurrences   Indicate which occurrence of a recurring task should be deleted.
     * @param   {boolean}                   suppressReadReceipts      Whether to suppress read receipts
     */
    InternalDelete(deleteMode: DeleteMode, sendCancellationsMode: SendCancellationsMode, affectedTaskOccurrences: AffectedTaskOccurrence, suppressReadReceipts: boolean): IPromise<void>;
    InternalDelete(deleteMode: DeleteMode, sendCancellationsMode: SendCancellationsMode = this.DefaultSendCancellationsMode, affectedTaskOccurrences: AffectedTaskOccurrence = this.DefaultAffectedTaskOccurrences, suppressReadReceipts: boolean = false): IPromise<void> {
        this.ThrowIfThisIsNew();
        this.ThrowIfThisIsAttachment();

        // If sendCancellationsMode is null, use the default value that's appropriate for item type.
        // if (!sendCancellationsMode)
        // {
        //     sendCancellationsMode = this.DefaultSendCancellationsMode;
        // }

        // If affectedTaskOccurrences is null, use the default value that's appropriate for item type.
        // if (!affectedTaskOccurrences)
        // {
        //     affectedTaskOccurrences = this.DefaultAffectedTaskOccurrences;
        // }

        return this.Service.DeleteItem(
            this.Id,
            deleteMode,
            sendCancellationsMode,
            affectedTaskOccurrences,
            suppressReadReceipts);
    }
    
    /**
     * @internal Loads the specified set of properties on the object.
     *
     * @param   {PropertySet}   propertySet   The properties to load.
     */
    InternalLoad(propertySet: PropertySet): IPromise<void> {
        this.ThrowIfThisIsNew();
        this.ThrowIfThisIsAttachment();

        return <any>this.Service.InternalLoadPropertiesForItems(
            [this],//new Item[] { this },
            propertySet,
            ServiceErrorHandling.ThrowOnError);
    }
    
    /**
     * @internal Update item.
     *
     * @param   {FolderId}                              parentFolderId                       The parent folder id.
     * @param   {ConflictResolutionMode}                conflictResolutionMode               The conflict resolution mode.
     * @param   {MessageDisposition}                    messageDisposition                   The message disposition.
     * @param   {SendInvitationsOrCancellationsMode}    sendInvitationsOrCancellationsMode   The send invitations or cancellations mode.
     * @return  {IPromise<Item>}                        Updated item :Promise.
     */    
    InternalUpdate(parentFolderId: FolderId, conflictResolutionMode: ConflictResolutionMode, messageDisposition: MessageDisposition, sendInvitationsOrCancellationsMode: SendInvitationsOrCancellationsMode): IPromise<Item>;
    /**
     * @internal Update item.
     *
     * @param   {FolderId}                              parentFolderId                       The parent folder id.
     * @param   {ConflictResolutionMode}                conflictResolutionMode               The conflict resolution mode.
     * @param   {MessageDisposition}                    messageDisposition                   The message disposition.
     * @param   {SendInvitationsOrCancellationsMode}    sendInvitationsOrCancellationsMode   The send invitations or cancellations mode.
     * @param   {boolean}                               suppressReadReceipts                 Whether to suppress read receipts
     * @return  {IPromise<Item>}                        Updated item :Promise.
     */
    InternalUpdate(parentFolderId: FolderId, conflictResolutionMode: ConflictResolutionMode, messageDisposition: MessageDisposition, sendInvitationsOrCancellationsMode: SendInvitationsOrCancellationsMode, suppressReadReceipts: boolean): IPromise<Item>;
    InternalUpdate(parentFolderId: FolderId, conflictResolutionMode: ConflictResolutionMode, messageDisposition: MessageDisposition, sendInvitationsOrCancellationsMode: SendInvitationsOrCancellationsMode, suppressReadReceipts: boolean = false): IPromise<Item> {
        this.ThrowIfThisIsNew();
        this.ThrowIfThisIsAttachment();

        var returnedItem: Item = null;

        // Regardless of whether item is dirty or not, if it has unprocessed
        // attachment changes, validate them and process now.
        if (this.HasUnprocessedAttachmentChanges()) {
            this.Attachments.Validate();
            this.Attachments.Save();
        }

        if (this.IsDirty && this.PropertyBag.GetIsUpdateCallNecessary()) {
            return this.Service.UpdateItem(
                this,
                parentFolderId,
                conflictResolutionMode,
                messageDisposition,
                sendInvitationsOrCancellationsMode !== null ? sendInvitationsOrCancellationsMode : this.DefaultSendInvitationsOrCancellationsMode,
                suppressReadReceipts);
        }

        return PromiseFactory.wrap(returnedItem);
    }
    
    /**
     * Moves this item to a the specified folder. Calling this method results in a call to EWS.
     * 
     * Move returns null if the move operation is across two mailboxes or between a mailbox and a public folder.
     *
     * @param   {FolderId}   destinationFolderId    The Id of the folder to which to move this item.
     * @return  {IPromise<Item>}                    The moved copy of this item :Promise.
     */
    Move(destinationFolderId: FolderId): IPromise<Item>;
    /**
     * Moves this item to a the specified folder. Calling this method results in a call to EWS.
     * 
     * Move returns null if the move operation is across two mailboxes or between a mailbox and a public folder.
     *
     * @param   {WellKnownFolderName}   destinationFolderName   The name of the folder to which to move this item.
     * @return  {IPromise<Item>}        The moved copy of this item :Promise.
     */
    Move(destinationFolderName: WellKnownFolderName): IPromise<Item>;
    Move(destinationFolderIdOrName: FolderId | WellKnownFolderName): IPromise<Item> {
        this.ThrowIfThisIsNew();
        this.ThrowIfThisIsAttachment();

        var folderId: FolderId = null;
        if (destinationFolderIdOrName instanceof FolderId) {
            folderId = destinationFolderIdOrName;
        }
        else {
            folderId = new FolderId(<WellKnownFolderName> destinationFolderIdOrName);
        }
        //EwsUtilities.ValidateParam(destinationFolderId, "destinationFolderId");
        return this.Service.MoveItem(this.Id, folderId);

    }
    
    /**
     * Removes an extended property.
     *
     * @param   {ExtendedPropertyDefinition}    extendedPropertyDefinition   The extended property definition.
     * @return  {boolean}                       True if property was removed.
     */
    RemoveExtendedProperty(extendedPropertyDefinition: ExtendedPropertyDefinition): boolean { return this.ExtendedProperties.RemoveExtendedProperty(extendedPropertyDefinition); }
    
    /**
     * Saves this item in the default folder based on the item's type (for example, an e-mail message is saved to the Drafts folder).
     * Calling this method results in at least one call to EWS. Mutliple calls to EWS might be made if attachments have been added.
     *
     */
    Save(): IPromise<void>;
    /**
     * Saves this item in a specific folder. Calling this method results in at least one call to EWS.
     * Mutliple calls to EWS might be made if attachments have been added.
     *
     * @param   {WellKnownFolderName}   parentFolderName   The name of the folder in which to save this item.
     */
    Save(parentFolderName?: WellKnownFolderName): IPromise<void>;
    /**
     * Saves this item in a specific folder. Calling this method results in at least one call to EWS.
     * Mutliple calls to EWS might be made if attachments have been added.
     *
     * @param   {}   parentFolderId   The Id of the folder in which to save this item.
     */
    Save(parentFolderId?: FolderId): IPromise<void>;
    Save(parentFolderIdOrName: FolderId | WellKnownFolderName = null): IPromise<void> {
        var parentFolderId: FolderId = null;
        if (parentFolderIdOrName !== null) {
            parentFolderId = <FolderId> parentFolderIdOrName;
            if (typeof parentFolderIdOrName === 'number') {
                parentFolderId = new FolderId(parentFolderIdOrName);
            }
        }
        return this.InternalCreate(
            parentFolderId,
            MessageDisposition.SaveOnly,
            null);
    }
    
    /**
     * Sets the extended property.
     *
     * @param   {ExtendedPropertyDefinition}    extendedPropertyDefinition   The extended property definition.
     * @param   {value}                         value                        The value.
     */
    SetExtendedProperty(extendedPropertyDefinition: ExtendedPropertyDefinition, value: any): void { this.ExtendedProperties.SetExtendedProperty(extendedPropertyDefinition, value); }
    
    /**
     * @internal Sets the subject.
     * 
     */
    SetSubject(subject: string): void { this.PropertyBag._setItem(ItemSchema.Subject, subject); }
    
    /**
     * Throws exception if this is attachment.
     *
     */
    ThrowIfThisIsAttachment(): void {
        if (this.IsAttachment) {
            throw new Error(Strings.OperationDoesNotSupportAttachments);//InvalidOperationException
        }
    }
    
    /**
     * Applies the local changes that have been made to this item. Calling this method results in at least one call to EWS.
     * Mutliple calls to EWS might be made if attachments have been added or removed.
     *
     * @param   {ConflictResolutionMode}   conflictResolutionMode   The conflict resolution mode.
     */    
    Update(conflictResolutionMode: ConflictResolutionMode): IPromise<void>;
    /**
     * Applies the local changes that have been made to this item. Calling this method results in at least one call to EWS.
     * Mutliple calls to EWS might be made if attachments have been added or removed.
     *
     * @param   {ConflictResolutionMode}   conflictResolutionMode   The conflict resolution mode.
     * @param   {boolean}   suppressReadReceipts     Whether to suppress read receipts
     */
    Update(conflictResolutionMode: ConflictResolutionMode, suppressReadReceipts: boolean): IPromise<void>;
    Update(conflictResolutionMode: ConflictResolutionMode, suppressReadReceipts: boolean = false): IPromise<void> {
        return <any>this.InternalUpdate(
            null /* parentFolder */,
            conflictResolutionMode,
            MessageDisposition.SaveOnly,
            null,
            suppressReadReceipts);
    }
    
    /**
     * @internal Validates this instance.
     * 
     */
    Validate(): void {
        super.Validate();

        this.Attachments.Validate();

        // Flag parameter is only valid for Exchange2013 or higher
        //
        var flag: IOutParam<Flag> = { outValue: null };
        if (this.TryGetProperty<Flag>(ItemSchema.Flag, flag) && flag.outValue != null) {
            if (this.Service.RequestedServerVersion < ExchangeVersion.Exchange2013) {
                throw new ServiceVersionException(
                    StringHelper.Format(
                        Strings.ParameterIncompatibleWithRequestVersion,
                        "Flag",
                        ExchangeVersion.Exchange2013));
            }

            flag.outValue.Validate();
        }
    }

    /**
     * @internal ~~created this to help find serviceobject type, ServiceObjectInstance instanceof Item fails by creating circular dependency in javascript/typescript~~
     */
    get InstanceType(): string { return XmlElementNames.Item; }

}