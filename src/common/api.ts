/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginInput {
  data: LoginData;
}

export enum UserRole {
  Root = "Root",
  Admin = "Admin",
  Monitor = "Monitor",
}

export interface LoginOutput {
  token: string;
  name: string;
  username: string;
  role: UserRole;
  id: string;
  active: boolean;
  diagnosis: boolean;
  isEngineer: boolean;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordInput {
  data: ChangePasswordData;
}

export interface UserModel {
  username: string;
  role: UserRole;
  id: string;
  description: string;
  name: string;
  canDiagnosis: boolean;
  active: boolean;
  isEngineer: boolean;
}

export interface ChangeUsernameData {
  oldUsername: string;
  newUsername: string;
}

export interface ChangeUsernameInput {
  data: ChangeUsernameData;
}

export interface ChangePasswordForUserData {
  userId: string;
  newPasswordForUser: string;
}

export interface ChangePasswordForUserInput {
  data: ChangePasswordForUserData;
}

export interface MeOutput {
  name: string;
  username: string;
  role: UserRole;
  id: string;
  active: boolean;
  diagnosis: boolean;
  isEngineer: boolean;
}

export interface SetLoginExpirationTimeData {
  expirationTimeInDays: number;
}

export interface SetLoginExpirationTimeInput {
  data: SetLoginExpirationTimeData;
}

export interface SetRegisterByteCountData {
  registerByteCount: number;
}

export interface SetRegisterByteCountInput {
  data: SetRegisterByteCountData;
}

export interface SuccessOutput {
  success: boolean;
}

export interface SetEncryptionEnabledData {
  encryptionEnabled: boolean;
}

export interface SetEncryptionEnabledInput {
  data: SetEncryptionEnabledData;
}

export interface SetAutoBackupPeriodData {
  autoBackupPeriod: number;
}

export interface SetAutoBackupPeriodInput {
  data: SetAutoBackupPeriodData;
}

export interface SetModbusServerPortData {
  port: number;
}

export interface SetModbusServerPortInput {
  data: SetModbusServerPortData;
}

export interface SetIntervalTimeToSendPacketsData {
  intervalTimeInSeconds: number;
}

export interface SetIntervalTimeToSendPacketsInput {
  data: SetIntervalTimeToSendPacketsData;
}

export interface GlobalConfigModel {
  encryptionEnabled: boolean;
  registerByteCount: number;
  logoutExpirationTime: number;
  autoBackupPeriod: number;
  modbusServerPort: number;
  intervalTimeToSendPacketsInSeconds: number;
}

export interface WhichPortExport {
  portId: string;
  nodeModuleId: string;
}

export interface PortExportInput {
  where: WhichPortExport;
}

export enum ModuleFeatureType {
  General = "General",
  Custom = "Custom",
}

export enum ModuleFeatureValueType {
  Single = "Single",
  Select = "Select",
}

export interface ValueOptionExport {
  name: string;
  encodingNumber: number;
}

export interface UnitExport {
  name: string;
  encodingNumber: number;
}

export interface FeatureExport {
  startRegister: number;
  endRegister: number;
  name: string;
  type: ModuleFeatureType;
  valueType: ModuleFeatureValueType;
  valueOptions_Cnt: number;
  valueOptions: ValueOptionExport[];
  units_Cnt: number;
  units: UnitExport[];
  isIp: boolean;
  isTotalVolume: boolean;
  isFreeVolume: boolean;
  manualRegisterCountForCustomType: number;
  tagName: string;
  tagSignalName: string;
  isGroupRegister: boolean;
  isBigEndian: boolean;
  isSigned: boolean;
}

export interface Boundry {
  startRegister: number;
  endRegister: number;
}

export interface MonitoringFeatureExport {
  startRegister: number;
  endRegister: number;
  name: string;
  registerCount: number;
  IOStartRegisterCount: Boundry;
  LogicValueStartRegisterCount: Boundry;
  ForceValueStartRegisterCount: Boundry;
  ForceFlagStartRegisterCount: Boundry;
  tagName: string;
  tagSignalName: string;
}

export interface PortExport {
  startRegister: number;
  endRegister: number;
  features_Cnt: number;
  features: FeatureExport[];
  monitoringFeatures_Cnt: number;
  monitoringFeatures: MonitoringFeatureExport[];
  name: string;
}

export interface WhichNodeModuleExport {
  nodeModuleId: string;
}

export interface NodeModuleExportInput {
  where: WhichNodeModuleExport;
}

export interface FCodeExport {
  startRegister: number;
  endRegister: number;
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
}

export interface NodeModuleExport {
  startRegister: number;
  endRegister: number;
  filename: string;
  name: string;
  aliasName: string;
  fCodes_Cnt: number;
  fCodes: FCodeExport[];
  ports_Cnt: number;
  ports: PortExport[];
}

export interface WhichNodeExport {
  nodeId: string;
}

export interface NodeExportInput {
  where: WhichNodeExport;
}

export interface LedExport {
  startRegister: number;
  endRegister: number;
  name: string;
  maxBitCount: number;
}

export interface ModuleFaultCodeMapping {
  encodingNumber: number;
  englishError: string;
  persianError: string;
  color: string;
}

export interface ModuleFaultCodeExport {
  startRegister: number;
  endRegister: number;
  moduleName: string;
  moduleTypeName: string;
  moduleIsMemoryType: boolean;
}

export interface NodeExport {
  startRegister: number;
  endRegister: number;
  nodeName: string;
  faultCodeRegister: number;
  nodeFaultIntervalTimeRegister: number;
  nodeFaultIntervalUnitRegister: number;
  nodeMonitoringFeatureIntervalTimeRegister: number;
  nodeMonitoringFeatureIntervalUnitRegister: number;
  yearRegister: number;
  monthRegister: number;
  dayRegister: number;
  hourRegister: number;
  minuteRegister: number;
  secondRegister: number;
  milliSecondRegister: number;
  includeAppFunctions: boolean;
  ledPanel_Cnt: number;
  ledPanel: LedExport[];
  moduleFaultCodeMappings_Cnt: number;
  moduleFaultCodeMappings: ModuleFaultCodeMapping[];
  modulesFaultCodeRegisters_Cnt: number;
  modulesFaultCodeRegisters: ModuleFaultCodeExport[];
  modules_Cnt: number;
  modules: NodeModuleExport[];
}

export enum EncodingNumberType {
  Unit = "Unit",
  FCode = "FCode",
  NodeFault = "NodeFault",
  ModuleFault = "ModuleFault",
}

export interface ReadNextAvalableEncodingNumberWhereData {
  type: EncodingNumberType;
}

export interface ReadNextAvalableEncodingNumberInput {
  where: ReadNextAvalableEncodingNumberWhereData;
}

export interface NextAvalableEncodingNumberModel {
  avalableEncodingNumber: number;
}

export interface BackupDataModel {
  filename: string;
}

export interface ReadBackupOutput {
  count: number;
  data: BackupDataModel[];
}

export interface DeleteBackupInput {
  where: BackupDataModel;
}

export interface GetBackupInput {
  name?: string;
}

export interface BackupDatabaseOutput {
  name: string;
}

export interface ImportBackupInput {
  where: BackupDataModel;
}

export interface RenameBackupInput {
  oldName: string;
  newName: string;
}

export interface CreateUserData {
  name: string;
  username: string;
  password: string;
  role: UserRole;
  canDiagnosis: boolean;
  isEngineer?: boolean;
  description?: string;
}

export interface CreateUserInput {
  data: CreateUserData;
}

export interface UpdateUserData {
  username?: string;
  name?: string;
  role?: UserRole;
  active?: string;
  description?: string;
  canDiagnosis?: boolean;
  isEngineer?: boolean;
}

export interface IdInput {
  id: string;
}

export interface UpdateUserInput {
  data: UpdateUserData;
  where: IdInput;
}

export interface ReadUserWhereData {
  id?: string;
  name?: string;
  username?: string;
  active?: boolean;
  isEngineer?: boolean;
  role?: UserRole;
  description?: string;
}

export interface PaginationData {
  /**
   * @min 0
   * @default 10
   */
  take?: number;
  /**
   * @min 0
   * @default 0
   */
  skip?: number;
}

export interface PaginationTakeAll {
  takeAll: boolean;
}

export type PaginationTakeAllData = object;

export enum UserSortFieldEnum {
  Name = "name",
  Username = "username",
  Role = "role",
  Active = "active",
  CanDiagnosis = "canDiagnosis",
}

export interface ReadUserSortByData {
  /** @default "name" */
  field?: UserSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadUserInput {
  where?: ReadUserWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadUserSortByData;
}

export interface ReadUserOutput {
  count: number;
  data: UserModel[];
}

export interface ActivateUserData {
  id: string;
  active: boolean;
}

export interface ActivateUserInput {
  where?: ActivateUserData;
}

export interface DateRange {
  endDate?: string;
  startDate?: string;
}

export interface ReadUserLogWhereData {
  message?: string;
  username?: string;
  dateRange?: DateRange;
}

export enum UserLogSortFieldEnum {
  CreatedDate = "createdDate",
  UserName = "userName",
}

export interface ReadUserLogSortByData {
  /** @default "createdDate" */
  field?: UserLogSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadUserLogInput {
  where?: ReadUserLogWhereData;
  pagination?: PaginationData;
  sortBy?: ReadUserLogSortByData;
}

export interface UserLogModel {
  id: string;
  message: string;
  itMessage: string;
  /** @format date-time */
  createdDate: string;
  user: UserModel;
}

export interface ReadUserLogOutput {
  count: number;
  data: UserLogModel[];
}

export interface CreateGroupData {
  color: string;
  name: string;
}

export interface CreateGroupInput {
  data: CreateGroupData;
}

export interface GroupModel {
  color: string;
  name: string;
  id: string;
}

export interface UpdateGroupData {
  name?: string;
  color?: string;
}

export interface UpdateGroupInput {
  data: UpdateGroupData;
  where: IdInput;
}

export interface ReadGroupWhereData {
  id?: string;
  name?: string;
  color?: string;
}

export enum GroupSortFieldEnum {
  Name = "name",
  Color = "color",
}

export interface ReadGroupSortByData {
  /** @default "name" */
  field?: GroupSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadGroupInput {
  where?: ReadGroupWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadGroupSortByData;
}

export interface ReadGroupOutput {
  count: number;
  data: GroupModel[];
}

export interface DeleteGroupInput {
  where?: IdInput;
}

export interface CreateRoomData {
  description?: string;
  name: string;
}

export interface CreateRoomInput {
  data: CreateRoomData;
}

export interface RoomModel {
  description: string;
  name: string;
  id: string;
}

export interface UpdateRoomData {
  name?: string;
  description?: string;
}

export interface UpdateRoomInput {
  data: UpdateRoomData;
  where: IdInput;
}

export interface ReadRoomWhereData {
  id?: string;
  name?: string;
  description?: string;
}

export enum RoomSortFieldEnum {
  Name = "name",
}

export interface ReadRoomSortByData {
  /** @default "name" */
  field?: RoomSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadRoomInput {
  where?: ReadRoomWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadRoomSortByData;
}

export interface ReadRoomOutput {
  count: number;
  data: RoomModel[];
}

export interface DeleteRoomInput {
  where?: IdInput;
}

export interface CreateCabinetData {
  roomId: string;
  description?: string;
  name: string;
}

export interface CreateCabinetInput {
  data: CreateCabinetData;
}

export interface CabinetModel {
  description: string;
  name: string;
  id: string;
  roomId: string;
}

export interface UpdateCabinetData {
  name?: string;
  description?: string;
  roomId?: string;
}

export interface UpdateCabinetInput {
  data: UpdateCabinetData;
  where: IdInput;
}

export interface ReadCabinetWhereData {
  id?: string;
  roomId?: string;
  name?: string;
  description?: string;
}

export enum CabinetSortFieldEnum {
  Name = "name",
  RoomName = "roomName",
}

export interface ReadCabinetSortByData {
  /** @default "name" */
  field?: CabinetSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadCabinetInput {
  where?: ReadCabinetWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadCabinetSortByData;
}

export interface ReadCabinetOutput {
  count: number;
  data: CabinetModel[];
}

export interface DeleteCabinetInput {
  where?: IdInput;
}

export interface CreateChannelData {
  description?: string;
  name: string;
}

export interface CreateChannelInput {
  data: CreateChannelData;
}

export interface ChannelModel {
  description: string;
  name: string;
  id: string;
}

export interface UpdateChannelData {
  name?: string;
  description?: string;
}

export interface UpdateChannelInput {
  data: UpdateChannelData;
  where: IdInput;
}

export interface ReadChannelWhereData {
  id?: string;
  name?: string;
  description?: string;
}

export enum ChannelSortFieldEnum {
  Name = "name",
}

export interface ReadChannelSortByData {
  /** @default "name" */
  field?: ChannelSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadChannelInput {
  where?: ReadChannelWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadChannelSortByData;
}

export interface ReadChannelOutput {
  count: number;
  data: ChannelModel[];
}

export interface DeleteChannelInput {
  where?: IdInput;
}

export interface CreateNodeData {
  channelId: string;
  cabinetId: string;
  description?: string;
  name: string;
  includeAppFunctions: boolean;
  groupId: string;
}

export interface CreateNodeInput {
  data: CreateNodeData;
}

export interface NodeModel {
  description: string;
  name: string;
  id: string;
  roomId: string;
  roomName: string;
  channelId: string;
  channelName: string;
  cabinetId: string;
  cabinetName: string;
  nodeGroupId: string;
  includeAppFunctions: boolean;
  nodeGroupName: string;
  ip: string;
  secondaryIp: string;
  exportIsNeeded: boolean;
}

export interface UpdateNodeData {
  name?: string;
  description?: string;
  ip?: string;
  secondaryIp?: string;
  groupId?: string;
  includeAppFunctions?: boolean;
  channelId?: string;
  cabinetId?: string;
}

export interface UpdateNodeInput {
  data: UpdateNodeData;
  where: IdInput;
}

export interface ReadNodeWhereData {
  id?: string;
  channelId?: string;
  roomId?: string;
  cabinetId?: string;
  groupId?: string;
  name?: string;
  description?: string;
  includeAppFunctions?: boolean;
  ip?: string;
  secondaryIp?: string;
}

export enum NodeSortFieldEnum {
  Name = "name",
  CabinetName = "cabinetName",
  ChannelName = "channelName",
  GroupName = "groupName",
  IncludeAppFunctions = "includeAppFunctions",
  Ip = "ip",
  SecondaryIp = "secondaryIp",
  RoomName = "roomName",
  ExportIsNeeded = "exportIsNeeded",
}

export interface ReadNodeSortByData {
  /** @default "name" */
  field?: NodeSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodeInput {
  where?: ReadNodeWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadNodeSortByData;
}

export interface ReadNodeOutput {
  count: number;
  data: NodeModel[];
}

export interface DeleteNodeInput {
  where?: IdInput;
}

export interface ReadNodeDetailsInput {
  where?: IdInput;
}

export interface NodeDetailsModuleModel {
  id: string;
  name: string;
  aliasName: string;
  description: string;
}

export interface NodeDetailsNodeModuleModel {
  id: string;
  moduleOrder: number;
  module: NodeDetailsModuleModel;
}

export interface NodeDetailsModel {
  id: string;
  name: string;
  description: string;
  ip: string;
  secondaryIp: string;
  exportIsNeeded: boolean;
  modules: NodeDetailsNodeModuleModel[];
}

export interface NewModule {
  moduleId: string;
  moduleAliasName: string;
}

export interface AddNodeModuleInput {
  nodeId: string;
  modules: NewModule[];
}

export interface FCodeModel {
  id: string;
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
  moduleId: string;
}

export enum ModuleTypeOperations {
  Read = "Read",
  Write = "Write",
  Monitor = "Monitor",
  Format = "Format",
  Export = "Export",
}

export interface ModuleTypeModel {
  operations: ModuleTypeOperations[];
  isMemoryType: boolean;
  description: string;
  name: string;
  id: string;
}

export interface ModuleModel {
  id: string;
  name: string;
  description: string;
  fCodes: FCodeModel[];
  moduleType: ModuleTypeModel;
}

export interface NodeModuleModel {
  id: string;
  node: NodeModel;
  aliasName: string;
  module: ModuleModel;
  nodeId: string;
  moduleId: string;
  moduleOrder: number;
  powerExponent: string;
  linearCoefficient: string;
  linearConstant: string;
}

export interface EditNodeModuleAliasName {
  where: IdInput;
  aliasName: string;
}

export interface NodeModuleOrder {
  id: string;
  order: number;
}

export interface UpdatedNodeModuleOrdersData {
  orders: NodeModuleOrder[];
}

export interface UpdateNodeModuleOrdersInput {
  data: UpdatedNodeModuleOrdersData;
  where: IdInput;
}

export interface DeleteNodeModuleInput {
  where?: IdInput;
}

export interface GetNodeIpsInput {
  where: IdInput;
}

export interface Ip {
  ip: string;
}

export interface GetNodeIpsOutput {
  data: Ip[];
}

export interface SetNodeTimeInput {
  date: string;
}

export interface ReadNodeTimeWhereData {
  id?: string;
  channelId?: string;
  roomId?: string;
  cabinetId?: string;
  groupId?: string;
  name?: string;
  description?: string;
  includeAppFunctions?: boolean;
  ip?: string;
  secondaryIp?: string;
}

export interface ReadNodeTimeSortByData {
  /** @default "name" */
  field?: NodeSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodeTimeInput {
  where?: ReadNodeTimeWhereData;
  pagination?: PaginationData;
  sortBy?: ReadNodeTimeSortByData;
}

export interface NodeTimeModel {
  name: string;
  id: string;
  /** @format date-time */
  time: string;
  diffInMiliseconds: number;
  isConnected: boolean;
}

export interface ReadNodeTimeOutput {
  count: number;
  data: NodeTimeModel[];
}

export interface ReadNodeModuleData {
  nodeId?: string;
  moduleId?: string;
}

export enum NodeModuleSortFieldsEnum {
  NodeName = "nodeName",
  ModuleName = "moduleName",
  ModuleAliasName = "moduleAliasName",
}

export interface NodeModuleSortByData {
  field?: NodeModuleSortFieldsEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodeModuleInput {
  where?: ReadNodeModuleData;
  pagination?: PaginationTakeAllData;
  sortBy?: NodeModuleSortByData;
}

export interface NodeModuleSimpleModel {
  id: string;
  nodeId: string;
  moduleId: string;
  moduleName: string;
  moduleOrder: number;
  aliasName: string;
}

export interface ReadNodeModuleOutput {
  count: number;
  data: NodeModuleSimpleModel[];
}

export interface DuplicateNodeData {
  id: string;
  cabinetId: string;
  channelId: string;
  roomId: string;
  newName: string;
}

export interface DuplicateNodeInput {
  data: DuplicateNodeData;
}

export interface CreateNodePropertyGroupData {
  nodeId: string;
  name: string;
}

export interface CreateNodePropertyGroupInput {
  data: CreateNodePropertyGroupData;
}

export interface NodePropertyGroupModel {
  id: string;
  name: string;
}

export interface UpdateNodePropertyGroupData {
  name?: string;
  nodeId?: string;
}

export interface UpdateNodePropertyGroupInput {
  data: UpdateNodePropertyGroupData;
  where: IdInput;
}

export interface ReadNodePropertyGroupWhereData {
  id?: string;
  nodeId?: string;
  name?: string;
}

export enum NodePropertyGroupSortFieldEnum {
  Name = "name",
}

export interface ReadNodePropertGroupSortByData {
  /** @default "name" */
  field?: NodePropertyGroupSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodePropertyGroupInput {
  where?: ReadNodePropertyGroupWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadNodePropertGroupSortByData;
}

export interface ReadNodePropertyGroupOutput {
  count: number;
  data: NodePropertyGroupModel[];
}

export interface DeleteNodePropertyGroupInput {
  where?: IdInput;
}

export interface CreateNodePropertyData {
  propertyGroupId: string;
  persianName: string;
  englishName: string;
  showOnHover: boolean;
  value: string;
}

export interface CreateNodePropertyInput {
  data: CreateNodePropertyData;
}

export interface NodePropertyModel {
  id: string;
  propertyGroupId: string;
  persianName: string;
  englishName: string;
  showOnHover: boolean;
  value: string;
}

export interface UpdateNodePropertyData {
  persianName: string;
  englishName: string;
  showOnHover: boolean;
  value: string;
}

export interface UpdateNodePropertyInput {
  data: UpdateNodePropertyData;
  where: IdInput;
}

export interface ReadNodePropertyWhereData {
  id?: string;
  propertyGroupId?: string;
  englishName?: string;
  persianName?: string;
  showOnHover?: boolean;
  value?: string;
}

export enum NodePropertySortFieldEnum {
  EnglishName = "englishName",
  PersianName = "persianName",
  PropertyGroupName = "propertyGroupName",
  Value = "value",
  ShowOnHover = "showOnHover",
}

export interface ReadNodePropertySortByData {
  /** @default "englishName" */
  field?: NodePropertySortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodePropertyInput {
  where?: ReadNodePropertyWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadNodePropertySortByData;
}

export interface ReadNodePropertyOutput {
  count: number;
  data: NodePropertyModel[];
}

export interface DeleteNodePropertyInput {
  where?: IdInput;
}

export interface ReadNodeModuleDetailsInput {
  where?: IdInput;
}

export interface NodeModuleParentModel {
  id: string;
  name: string;
  description: string;
  moduleType: ModuleTypeModel;
  powerExponent: string;
  linearCoefficient: string;
  linearConstant: string;
}

export interface TagModel {
  signalTag: string;
  name: string;
  groupId: string;
  id: string;
}

export interface NodeModuleMonitoringFeatureModel {
  id: string;
  description: string;
  name: string;
  order: number;
  registerCount: number;
  tag: TagModel;
}

export interface FeatureValueModel {
  encodingNumber: number;
  name: string;
  id?: string;
}

export interface UnitGroupModel {
  id: string;
  name: string;
}

export interface UnitModel {
  encodingNumber: number;
  name: string;
  unitGroupId: string;
  unitGroup: UnitGroupModel;
  id: string;
}

export interface FeatureModel {
  id: string;
  name: string;
  description: string;
  isSigned: boolean;
  isBigEndian: boolean;
  powerExponent: number;
  linearCoefficient: number;
  linearConstant: number;
  manualRegisterCount: number;
  type: ModuleFeatureType;
  valueType: ModuleFeatureValueType;
  valueOptions: FeatureValueModel[];
  units: UnitModel[];
  isIp: boolean;
  isTime: boolean;
  isTotalVolume: boolean;
  isFreeVolume: boolean;
  isGroupRegister: boolean;
}

export interface NodeModulePortFeatureValueModel {
  nodeModuleId: string;
  portFeatureId: string;
  values: string[];
  valueOptionId: string;
  unitId: string;
  tag: TagModel;
  powerExponent: number;
  linearCoefficient: number;
  linearConstant: number;
}

export interface NodeModulePortFeatureModel {
  id: string;
  order: number;
  feature: FeatureModel;
  value: NodeModulePortFeatureValueModel;
}

export interface NodeMoudlePortModelDetail {
  id: string;
  name: string;
  order: number;
  monitoringFeatures: NodeModuleMonitoringFeatureModel[];
  portFeatures: NodeModulePortFeatureModel[];
}

export interface NodeModuleDetailsModel {
  id: string;
  nodeId: string;
  nodeName: string;
  aliasName: string;
  module: NodeModuleParentModel;
  ports: NodeMoudlePortModelDetail[];
}

export interface ReadNodeLedIntervallyInput {
  where: IdInput;
  shouldCacheData?: boolean;
}

export interface NodeLedStatus {
  ledGroupId: string;
  connectionStatus: number[];
  value: number[];
}

export interface ReadNodeLedIntervallyOutput {
  data: NodeLedStatus[];
}

export interface WriteNodeLedData {
  connectionStatus: number[];
  value: number[];
}

export interface WriteNodeLedInput {
  where: IdInput;
  data: WriteNodeLedData[];
}

export interface SetFeatureValueData {
  portFeatureId: string;
  value?: string[];
  unitId?: string;
  valueOptionId?: string;
}

export interface SetFeatureValueInput {
  nodeModuleId: string;
  portId: string;
  shouldCacheData?: boolean;
  data: SetFeatureValueData[];
  skipHardwareWrite?: boolean;
}

export interface CalibrationValues {
  powerExponent: number;
  linearCoefficient: number;
  linearConstant: number;
}

export interface WhichNodeFeature {
  nodeModuleId: string;
  portFeatureId: string;
}

export interface SetNodeFeatureCalibrationValueInput {
  data: CalibrationValues;
  where: WhichNodeFeature;
}

export interface WhichNodeModulePortInput {
  nodeModuleId: string;
  portId: string;
  shouldCacheData?: boolean;
}

export interface FeatureValueData {
  values: string[];
  valueOptionId: string;
  unitId: string;
  tag: TagModel;
}

export interface ReadPortFeatureValueOutput {
  data: FeatureValueData[];
}

export enum WhichIntervalTimeEnum {
  Value0 = 0,
  Value1 = 1,
}

export interface SetNodeIntervalTimeWhere {
  nodeId: string;
  whichIntervalTime: WhichIntervalTimeEnum;
}

export enum IntervalTimeUnitEnum {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface SetNodeIntervalTimeData {
  time: number;
  unit: IntervalTimeUnitEnum;
}

export interface SetNodeIntervalTimeInput {
  where: SetNodeIntervalTimeWhere;
  data: SetNodeIntervalTimeData;
}

export interface MonitoringFeatureOnlineValue {
  id: string;
  ioValue: string;
  logicValue: string;
  forceValue: string;
  forceStatus: string;
  name: string;
  tag: TagModel;
  description: string;
  moduleName: string;
  moduleAliasName: string;
  registerCount?: number;
  portName: string;
  nodeName: string;
  nodeModuleId: string;
}

export interface ReadPortMonitoringFeatureValueOutput {
  data: MonitoringFeatureOnlineValue[];
}

export interface MonitorinFeatureOnlineBaseModel {
  id: string;
  ioValue: string;
  logicValue: string;
  forceValue: string;
  forceStatus: string;
}

export interface MonitoringFeatureForceInput {
  nodeModuleId: string;
  portId: string;
  shouldCacheData?: boolean;
  data: MonitorinFeatureOnlineBaseModel[];
}

export interface ReadFeatureValueWhereData {
  nodeId?: string;
  moduleId?: string;
  featureId?: string;
  roomId?: string;
  cabinetId?: string;
  channelId?: string;
  nodeGroupId?: string;
  tagId?: string;
  hasTag?: boolean;
}

export enum NodeFeatureValueSortFieldsEnum {
  RoomName = "roomName",
  CabinetName = "cabinetName",
  ChannelName = "channelName",
  NodeName = "nodeName",
  NodeGroupName = "nodeGroupName",
  ModuleName = "moduleName",
  FeatureName = "featureName",
  TagName = "tagName",
  SignalTag = "signalTag",
}

export interface NodeFeatureValueSortByData {
  field?: NodeFeatureValueSortFieldsEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadFeatureValueInput {
  where?: ReadFeatureValueWhereData;
  pagination?: PaginationData;
  sortBy?: NodeFeatureValueSortByData;
}

export interface NodeFeatureValueModel {
  nodeModuleId: string;
  nodeModuleAliasName: string;
  nodeId: string;
  tagGroupName: string;
  nodeName: string;
  moduleId: string;
  moduleName: string;
  portName: string;
  portOrder: string;
  portFeatureId: string;
  featureId: string;
  featureName: string;
  roomId: string;
  roomName: string;
  cabinetId: string;
  cabinetName: string;
  channelId: string;
  channelName: string;
  nodeGroupId: string;
  nodeGroupName: string;
  tagId: string;
  softwareTag: string;
  signalTag: string;
  powerExponent: number;
  linearCoefficient: number;
  linearConstant: number;
}

export interface ReadNodeFeatureValueOutput {
  count: number;
  data: NodeFeatureValueModel[];
}

export interface ReadAllNodesMonitoringFeaturesData {
  nodeId?: string;
  moduleId?: string;
  monitoringFeatureId?: string;
  roomId?: string;
  cabinetId?: string;
  channelId?: string;
  nodeGroupId?: string;
  tagId?: string;
  hasTag?: boolean;
}

export enum NodeMonitoringFeatureSortFieldsEnum {
  RoomName = "roomName",
  CabinetName = "cabinetName",
  ChannelName = "channelName",
  NodeName = "nodeName",
  NodeGroupName = "nodeGroupName",
  ModuleName = "moduleName",
  MonitoringFeatureName = "monitoringFeatureName",
  TagName = "tagName",
  SignalTag = "signalTag",
}

export interface NodeMonitoringFeatureSortByData {
  field?: NodeMonitoringFeatureSortFieldsEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadAllNodesMonitoringFeaturesInput {
  where?: ReadAllNodesMonitoringFeaturesData;
  pagination?: PaginationTakeAllData;
  sortBy?: NodeMonitoringFeatureSortByData;
}

export interface NodeMonitoringFeatureAssignedModel {
  nodeModuleId: string;
  nodeId: string;
  nodeName: string;
  tagGroupName: string;
  moduleId: string;
  moduleName: string;
  portName: string;
  portOrder: number;
  roomId: string;
  roomName: string;
  cabinetId: string;
  cabinetName: string;
  channelId: string;
  channelName: string;
  nodeGroupId: string;
  nodeGroupName: string;
  tagId: string;
  softwareTag: string;
  signalTag: string;
  monitoringFeatureId: string;
  monitoringFeatureDescription: string;
  monitoringFeatureName: string;
  monitoringFeatureRegisterCount: string;
  monitoringFeatureAliasName: string;
}

export interface ReadAllNodesMonitoringFeaturesOutput {
  count: number;
  data: NodeMonitoringFeatureAssignedModel[];
}

export interface SetFeatureValueTag {
  portFeatureId: string;
  nodeModuleId: string;
  tagId?: string;
}

export interface SetFeatureValueTagInput {
  data: SetFeatureValueTag;
}

export interface SetMonitoringFeatureTag {
  monitoringFeatureId: string;
  nodeModuleId: string;
  tagId?: string;
}

export interface SetNodeMonitoringFeatureTagInput {
  data: SetMonitoringFeatureTag;
}

export interface UpdateNodeModuleCoefficientsData {
  powerExponent?: string;
  linearCoefficient?: string;
  linearConstant?: string;
}

export interface UpdateNodeModuleCoefficientsInput {
  data: UpdateNodeModuleCoefficientsData;
  where: IdInput;
}

export interface CreateNodeLedData {
  nodeId: string;
  name: string;
  maxBitCount: number;
  onColor: string;
}

export interface CreateNodeLedInput {
  data: CreateNodeLedData;
}

export interface NodeLedModel {
  id: string;
  nodeId: string;
  name: string;
  onColor: string;
  maxBitCount: number;
  order: number;
  ledNames: string[];
}

export interface UpdateNodeLedData {
  name?: string;
  maxBitCount?: number;
  onColor?: string;
}

export interface UpdateNodeLedInput {
  data: UpdateNodeLedData;
  where: IdInput;
}

export interface ReadNodeLedWhereData {
  id?: string;
  nodeId?: string;
  name?: string;
}

export enum NodeLedSortFieldEnum {
  Name = "name",
  Order = "order",
  MaxBitCount = "maxBitCount",
}

export interface ReadNodeLedSortByData {
  /** @default "order" */
  field?: NodeLedSortFieldEnum;
  /** @default false */
  descending?: boolean;
}

export interface ReadNodeLedInput {
  where?: ReadNodeLedWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadNodeLedSortByData;
}

export interface ReadNodeLedOutput {
  count: number;
  data: NodeLedModel[];
}

export interface DeleteNodeLedInput {
  where?: IdInput;
}

export interface NodeLedOrder {
  id: string;
  order: number;
}

export interface UpdatedNodeLedOrdersData {
  orders: NodeLedOrder[];
}

export interface UpdateNodeLedOrdersInput {
  data: UpdatedNodeLedOrdersData;
  where: IdInput;
}

export interface UpdateNodeLedNameData {
  index: number;
  name: string;
}

export interface UpdateNodeLedNameInput {
  data: UpdateNodeLedNameData;
  where: IdInput;
}

export interface CopyNodeLedGroupData {
  nodeLEdGroupIdList: string[];
  nodeIdList: string[];
}

export interface CopyNodeLedGroupInput {
  data: CopyNodeLedGroupData;
}

export interface CreateNodeFaultData {
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
}

export interface CreateNodeFaultInput {
  data: CreateNodeFaultData;
}

export interface NodeFaultModel {
  id: string;
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
}

export interface UpdateNodeFaultData {
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
}

export interface UpdateNodeFaultInput {
  data: UpdateNodeFaultData;
  where: IdInput;
}

export interface ReadNodeFaultWhereData {
  id?: string;
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
}

export enum NodeFaultSortFieldEnum {
  EncodingNumber = "encodingNumber",
  EnglishError = "englishError",
  PersianError = "persianError",
  Color = "color",
}

export interface ReadNodeFaultSortByData {
  /** @default "englishError" */
  field?: NodeFaultSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadNodeFaultInput {
  where?: ReadNodeFaultWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadNodeFaultSortByData;
}

export interface ReadNodeFaultOutput {
  count: number;
  data: NodeFaultModel[];
}

export interface DeleteNodeFaultInput {
  where?: IdInput;
}

export enum FeaturePlugin {
  IP = "IP",
  Time = "Time",
  TotalMemory = "TotalMemory",
  FreeMemory = "FreeMemory",
}

export interface CreateFeatureData {
  isSigned: boolean;
  isBigEndian: boolean;
  name: string;
  powerExponent: number;
  linearCoefficient: number;
  linearConstant: number;
  manualRegisterCount?: number;
  type: ModuleFeatureType;
  valueType?: ModuleFeatureValueType;
  valueOptions?: FeatureValueModel[];
  unitGroupIds?: string[];
  description?: string;
  plugin?: FeaturePlugin;
  isGroupRegister?: boolean;
}

export interface CreateFeatureInput {
  data: CreateFeatureData;
}

export interface UpdateFeatureData {
  isSigned?: boolean;
  isBigEndian?: boolean;
  name?: string;
  powerExponent?: number;
  linearCoefficient?: number;
  linearConstant?: number;
  manualRegisterCount?: number;
  type?: ModuleFeatureType;
  valueType?: ModuleFeatureValueType;
  valueOptions?: FeatureValueModel[];
  unitGroupIds?: string[];
  description?: string;
  plugin?: FeaturePlugin;
  isGroupRegister?: boolean;
}

export interface UpdateFeatureInput {
  data?: UpdateFeatureData;
  where?: IdInput;
}

export interface ReadFeatureWhereData {
  id?: string;
  isSigned?: boolean;
  isBigEndian?: boolean;
  name?: string;
  powerExponent?: number;
  linearCoefficient?: number;
  linearConstant?: number;
  manualRegisterCount?: number;
  type?: ModuleFeatureType;
  valueType?: ModuleFeatureValueType;
  unitId?: string;
  description?: string;
  isIp?: boolean;
  isTotalVolume?: boolean;
  isFreeVolume?: boolean;
  isGroupRegister?: boolean;
}

export enum FeatureSortFieldEnum {
  Name = "name",
  IsBigEndian = "isBigEndian",
  IsFreeVolume = "isFreeVolume",
  IsGroupRegister = "isGroupRegister",
  IsIp = "isIp",
  IsSigned = "isSigned",
  IsTotalVolume = "isTotalVolume",
  Type = "type",
}

export interface ReadFeatureSortByData {
  /** @default "name" */
  field?: FeatureSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadFeatureInput {
  where?: ReadFeatureWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadFeatureSortByData;
}

export interface ReadFeatureOutput {
  count: number;
  data: FeatureModel[];
}

export interface DeleteFeatureInput {
  where?: IdInput;
}

export interface CreateMonitoringFeatureData {
  name: string;
  registerCount: number;
  portId: string;
  description?: string;
}

export interface CreateMonitoringFeatureInput {
  data: CreateMonitoringFeatureData;
}

export interface MonitoringFeatureModel {
  id: string;
  description: string;
  name: string;
  order: number;
  registerCount: number;
  portId: string;
}

export interface UpdateMonitoringFeatureData {
  name?: string;
  registerCount?: number;
  description?: string;
}

export interface UpdateMonitoringFeatureInput {
  data?: UpdateMonitoringFeatureData;
  where?: IdInput;
}

export interface ReadMonitoringFeatureWhereData {
  id?: string;
  name?: string;
  registerCount?: number;
  portId?: string;
  nodeModuleId?: string;
  description?: string;
}

export enum MonitoringFeatureSortFieldEnum {
  Name = "name",
  Order = "order",
  RegisterCount = "registerCount",
  SoftwareTagName = "softwareTagName",
  SignalTagName = "signalTagName",
}

export interface ReadMonitoringFeatureSortByData {
  /** @default "name" */
  field?: MonitoringFeatureSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadMonitoringFeatureInput {
  where?: ReadMonitoringFeatureWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadMonitoringFeatureSortByData;
}

export interface ReadMonitoringFeatureOutput {
  count: number;
  data: MonitoringFeatureModel[];
}

export interface DeleteMonitoringFeatureInput {
  where?: IdInput;
}

export interface CreateModuleTypeData {
  description?: string;
  name: string;
  isMemoryType: boolean;
  operations: ModuleTypeOperations[];
}

export interface CreateModuleTypeInput {
  data: CreateModuleTypeData;
}

export interface UpdateModuleTypeData {
  description?: string;
  name?: string;
  isMemoryType?: boolean;
  operations?: ModuleTypeOperations[];
}

export interface UpdateModuleTypeInput {
  data: UpdateModuleTypeData;
  where: IdInput;
}

export interface ReadModuleTypeWhereData {
  id?: string;
  name?: string;
  description?: string;
  isMemoryType?: boolean;
  operation?: ModuleTypeOperations;
}

export enum ModuleTypeSortFieldEnum {
  Name = "name",
  IsMemoryType = "isMemoryType",
}

export interface ReadModuleTypeSortByData {
  /** @default "name" */
  field?: ModuleTypeSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadModuleTypeInput {
  where?: ReadModuleTypeWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadModuleTypeSortByData;
}

export interface ReadModuleTypeOutput {
  count: number;
  data: ModuleTypeModel[];
}

export interface DeleteModuleTypeInput {
  where?: IdInput;
}

export interface CreateModuleData {
  description?: string;
  name: string;
  moduleTypeId: string;
}

export interface CreateModuleInput {
  data: CreateModuleData;
}

export interface UpdateModuleData {
  description?: string;
  name?: string;
  moduleTypeId?: string;
}

export interface UpdateModuleInput {
  data: UpdateModuleData;
  where: IdInput;
}

export interface ReadModuleWhereData {
  id?: string;
  name?: string;
  description?: string;
  isMemoryType?: boolean;
  operation?: ModuleTypeOperations;
  moduleTypeId?: string;
}

export enum ModuleSortFieldEnum {
  Name = "name",
  ModuleTypeName = "moduleTypeName",
}

export interface ReadModuleSortByData {
  /** @default "name" */
  field?: ModuleSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadModuleInput {
  where?: ReadModuleWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadModuleSortByData;
}

export interface ReadModuleOutput {
  count: number;
  data: ModuleModel[];
}

export interface DeleteModuleInput {
  where?: IdInput;
}

export interface PortOrder {
  id: string;
  order: number;
}

export interface UpdatedPortOrdersData {
  orders: PortOrder[];
}

export interface UpdatePortOrdersInput {
  data: UpdatedPortOrdersData;
  where: IdInput;
}

export interface ReadModuleDetailsInput {
  where?: IdInput;
}

export interface PortFeatureModel {
  id: string;
  order: number;
  feature: FeatureModel;
  portId: string;
}

export interface PortModelDetail {
  id: string;
  name: string;
  order: number;
  monitoringFeatures: MonitoringFeatureModel[];
  portFeatures: PortFeatureModel[];
}

export interface ModuleDetailsModel {
  id: string;
  name: string;
  description: string;
  fCodes: FCodeModel[];
  moduleType: ModuleTypeModel;
  ports: PortModelDetail[];
}

export interface CreatePortData {
  name: string;
  moduleId: string;
}

export interface CreatePortInput {
  data: CreatePortData;
}

export interface ModuleTypeLightModel {
  id: string;
  name: string;
  isMemoryType: boolean;
  operations: ModuleTypeOperations[];
}

export interface ModuleLightModel {
  id: string;
  name: string;
  moduleType: ModuleTypeLightModel;
}

export interface PortModel {
  id: string;
  name: string;
  order: number;
  module: ModuleLightModel;
}

export interface UpdatedPortData {
  name?: string;
}

export interface UpdatePortInput {
  data: UpdatedPortData;
  where: IdInput;
}

export interface ReadPortWhereData {
  id?: string;
  name?: string;
  moduleId?: string;
  nodeModuleId?: string;
}

export enum PortSortFieldEnum {
  Name = "name",
  Order = "order",
}

export interface ReadPortSortByData {
  /** @default "order" */
  field?: PortSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadPortInput {
  where?: ReadPortWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadPortSortByData;
}

export interface ReadPortOutput {
  count: number;
  data: PortModel[];
}

export interface DeletePortInput {
  where?: IdInput;
}

export interface MonitoringFeatureOrder {
  id: string;
  order: number;
}

export interface UpdatedMonitoringFeatureOrdersData {
  orders: MonitoringFeatureOrder[];
}

export interface UpdateMonitoringFeatureOrdersInput {
  data: UpdatedMonitoringFeatureOrdersData;
  where: IdInput;
}

export interface AddFeatureData {
  portId: string;
  featureIds: string[];
}

export interface AddFeatureInput {
  data: AddFeatureData;
}

export interface RemoveFeatureInput {
  where?: IdInput;
}

export interface FeatureOrder {
  id: string;
  order: number;
}

export interface UpdatedFeatureOrdersData {
  orders: FeatureOrder[];
}

export interface UpdateFeatureOrdersInput {
  data: UpdatedFeatureOrdersData;
  where: IdInput;
}

export interface CopyPortDataToAnotherPortData {
  copyFromPortId: string;
  copyToPortId: string;
}

export interface CopyPortDataToAnotherPortInput {
  data: CopyPortDataToAnotherPortData;
}

export interface DuplicatePortDataInput {
  name: string;
  id: string;
}

export interface CreateModuleFaultData {
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
}

export interface CreateModuleFaultInput {
  data: CreateModuleFaultData;
}

export interface ModuleFaultModel {
  id: string;
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
}

export interface UpdateModuleFaultData {
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
}

export interface UpdateModuleFaultInput {
  data: UpdateModuleFaultData;
  where: IdInput;
}

export interface ReadModuleFaultWhereData {
  id?: string;
  moduleId?: string;
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
}

export enum ModuleFaultSortFieldEnum {
  Color = "color",
  PersianError = "persianError",
  EnglishError = "englishError",
  EncodingNumber = "encodingNumber",
}

export interface ReadModuleFaultSortByData {
  /** @default "englishError" */
  field?: ModuleFaultSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadModuleFaultInput {
  where?: ReadModuleFaultWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadModuleFaultSortByData;
}

export interface ReadModuleFaultOutput {
  count: number;
  data: ModuleFaultModel[];
}

export interface DeleteModuleFaultInput {
  where?: IdInput;
}

export interface CreateUnitData {
  encodingNumber: number;
  unitGroupId: string;
  name: string;
}

export interface CreateUnitInput {
  data: CreateUnitData;
}

export interface UpdateUnitData {
  name?: string;
  unitGroupId?: string;
  encodingNumber?: number;
}

export interface UpdateUnitInput {
  data: UpdateUnitData;
  where: IdInput;
}

export interface ReadUnitWhereData {
  id?: string;
  name?: string;
  encodingNumber?: number;
}

export enum UnitSortFieldEnum {
  Name = "name",
  EncodingNumber = "encodingNumber",
  UnitGroupName = "unitGroupName",
}

export interface ReadUnitSortByData {
  /** @default "name" */
  field?: UnitSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadUnitInput {
  where?: ReadUnitWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadUnitSortByData;
}

export interface ReadUnitOutput {
  count: number;
  data: UnitModel[];
}

export interface DeleteUnitInput {
  where?: IdInput;
}

export interface CreateUnitGroupData {
  name: string;
}

export interface CreateUnitGroupInput {
  data: CreateUnitGroupData;
}

export interface DeleteUnitGroupInput {
  where?: IdInput;
}

export interface UpdateUnitGroupData {
  name?: string;
}

export interface UpdateUnitGroupInput {
  data: UpdateUnitGroupData;
  where: IdInput;
}

export interface ReadUnitGroupWhereData {
  id?: string;
  name?: string;
}

export enum UnitGroupSortFieldEnum {
  Name = "name",
}

export interface ReadUnitGroupSortByData {
  /** @default "name" */
  field?: UnitGroupSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadUnitGroupInput {
  where?: ReadUnitGroupWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadUnitGroupSortByData;
}

export interface ReadUnitGroupOutput {
  count: number;
  data: UnitGroupModel[];
}

export interface RoomDetailsWhereData {
  id?: string;
  cabinetId?: string;
  channelId?: string;
  nodeGroupId?: string;
  nodeId?: string;
}

export interface RoomDetailsInput {
  where?: RoomDetailsWhereData;
}

export enum GraphNodeEnum {
  Room = "Room",
  Cabinet = "Cabinet",
  Channel = "Channel",
  Node = "Node",
}

export interface GraphNode {
  id: string;
  name: string;
  type: GraphNodeEnum;
  meta: Record<string, any>;
  children: GraphNode[];
}

export interface RoomDetailsOutput {
  data: GraphNode[];
}

export interface GetModuleFaultsInNodeWhereData {
  nodeId: string;
}

export interface GetModuleFaultsInNodeInput {
  where: GetModuleFaultsInNodeWhereData;
}

export interface FaultCode {
  color: string;
  encodingNumber: number;
  englishError: string;
  persianError: string;
}

export interface ModuleFault {
  moduleName: string;
  nodeModuleId: string;
  moduleId: string;
  faultCode: FaultCode;
}

export interface ModuleFaultsInNode {
  moduleTypeName: string;
  modules: ModuleFault[];
}

export interface GetModuleFaultsInNodeOutput {
  data: ModuleFaultsInNode[];
}

export interface WhichNodeModuleInput {
  where: IdInput;
}

export interface GetNodeModuleFCodesIntervallyOutput {
  fCodes: FCodeModel[];
}

export interface TagIdListInput {
  tags: IdInput[];
}

export interface GetMonitoringFeaturesDataWithSwTagInput {
  where: TagIdListInput;
}

export interface NodeMonitoringFeatureModel {
  rowId: string;
  nodeId: string;
  nodeName: string;
  nodeModuleId: string;
  moduleName: string;
  moduleAliasName: string;
  nodeModuleOrder: number;
  portOrder: number;
  portId: string;
  portName: string;
  monitoringFeatureId: string;
  monitoringFeatureName: string;
  monitoringFeatureDescription: string;
  monitoringFeatureOrder: number;
  tagId: string;
  tagName: string;
  signalTag: string;
  tagGroupId: string;
  powerExponent: string;
  linearCoefficient: string;
  linearConstant: string;
}

export interface GetMonitoringFeaturesDataWithSwTagOutput {
  data: NodeMonitoringFeatureModel[];
}

export interface GetMonitoringFeatureValuesIntervallyInput {
  monitoringFeatures: NodeMonitoringFeatureModel[];
  shouldCacheData?: boolean;
}

export interface GetForcedMonitoringFeaturesWhereData {
  nodeId?: string;
  moduleId?: string;
  moduleAliasName?: string;
  monitoringFeatureId?: string;
  tagId?: string;
}

export enum ForcedMonitoringFeaturesSortFieldEnum {
  NodeName = "nodeName",
  ModuleName = "moduleName",
  ModuleAliasName = "moduleAliasName",
  PortName = "portName",
  MonitoringFeatureName = "monitoringFeatureName",
  TagName = "tagName",
  SignalTagName = "signalTagName",
}

export interface GetForcedMonitoringFeaturesSortByData {
  /** @default "monitoringFeatureName" */
  field?: ForcedMonitoringFeaturesSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface GetForcedMonitoringFeaturesInput {
  where?: GetForcedMonitoringFeaturesWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: GetForcedMonitoringFeaturesSortByData;
}

export interface ReadForcedMonitoringFeaturesOutput {
  data: MonitoringFeatureOnlineValue[];
  count: number;
}

export interface MonitoringFeatureOnlineValueWithRowId {
  id: string;
  ioValue: string;
  logicValue: string;
  forceValue: string;
  forceStatus: string;
  name: string;
  rowId: string;
  tag: TagModel;
  description: string;
  moduleName: string;
  moduleAliasName: string;
  registerCount?: number;
  portName: string;
}

export interface ReadPortMonitoringFeatureValueOutputWithId {
  data: MonitoringFeatureOnlineValueWithRowId[];
}

export interface SetIntervallTimeForAllNodesInput {
  whichIntervalTime: WhichIntervalTimeEnum;
  data: SetNodeIntervalTimeData;
}

export enum WhichIpConnectedEnum {
  PrimaryIp = "PrimaryIp",
  SecondaryIp = "SecondaryIp",
  None = "None",
}

export interface NodeHealth {
  nodeId: string;
  connectedIp: WhichIpConnectedEnum;
  hasFault: boolean;
  healthResponseCode: number;
  faultMsgPersian: string;
  faultMsgEnglish: string;
}

export interface GetNodesHealthOutput {
  data: NodeHealth[];
}

export interface GetNodesStorageIntervallyData {
  shouldCacheData: boolean;
}

export interface GetNodesStorageIntervallyInput {
  data?: GetNodesStorageIntervallyData;
}

export interface StorageType {
  freeVolume: string;
  freeVolumeUnitName: string;
  totalVolumeUnitName: string;
  totalVolume: string;
  moduleName: string;
}

export interface NodeStorage {
  nodeId: string;
  nodeName: string;
  storageList: StorageType[];
  isConnected: boolean;
}

export interface GetNodesStorageIntervallyOutput {
  data: NodeStorage[];
}

export interface CreateTagData {
  signalTag: string;
  name: string;
  groupId: string;
}

export interface CreateTagInput {
  data: CreateTagData;
}

export interface UpdateTagData {
  name?: string;
  signalTag?: string;
  groupId?: string;
}

export interface UpdateTagInput {
  data: UpdateTagData;
  where: IdInput;
}

export enum TagUsedInEnum {
  UsedInMonitoringFeature = "UsedInMonitoringFeature",
  UsedInFeature = "UsedInFeature",
}

export interface ReadTagWhereData {
  id?: string;
  groupId?: string;
  name?: string;
  signalTag?: string;
  unused?: boolean;
  usedIn?: TagUsedInEnum;
  nodeId?: string;
}

export enum TagSortFieldEnum {
  Name = "name",
  SignalTag = "signalTag",
  GroupName = "groupName",
}

export interface ReadTagSortByData {
  /** @default "name" */
  field?: TagSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadTagInput {
  where?: ReadTagWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadTagSortByData;
}

export interface ReadTagOutput {
  count: number;
  data: TagModel[];
}

export interface DeleteTagInput {
  where?: IdInput;
}

export enum TagGroupType {
  Pulse = "Pulse",
  Curve = "Curve",
}

export interface CreateTagGroupData {
  name: string;
  aliasName: string;
  type: TagGroupType;
}

export interface CreateTagGroupInput {
  data: CreateTagGroupData;
}

export interface TagGroupModel {
  id: string;
  name: string;
  aliasName: string;
  type: TagGroupType;
}

export interface UpdateTagGroupData {
  name?: string;
  aliasName?: string;
  type?: TagGroupType;
}

export interface UpdateTagGroupInput {
  data: UpdateTagGroupData;
  where: IdInput;
}

export interface ReadTagGroupWhereData {
  id?: string;
  name?: string;
  aliasName?: string;
  type?: TagGroupType;
}

export enum TagGroupSortFieldEnum {
  Name = "name",
}

export interface ReadTagGroupSortByData {
  /** @default "name" */
  field?: TagGroupSortFieldEnum;
  /** @default true */
  descending?: boolean;
}

export interface ReadTagGroupInput {
  where?: ReadTagGroupWhereData;
  pagination?: PaginationTakeAll | PaginationData;
  sortBy?: ReadTagGroupSortByData;
}

export interface ReadTagGroupOutput {
  count: number;
  data: TagGroupModel[];
}

export interface DeleteTagGroupInput {
  where?: IdInput;
}

export interface ApplicationFunctionModel {
  name: string;
  encodingNumber: ApplicationFunctionModelEncodingNumberEnum;
}

export interface ReadApplicationFunctionOutput {
  data: ApplicationFunctionModel[];
}

export interface CreateFCodeData {
  englishError: string;
  persianError: string;
  color: string;
  encodingNumber: number;
  moduleId: string;
}

export interface CreateFCodeInput {
  data: CreateFCodeData;
}

export interface UpdateFCodeData {
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
  moduleId?: string;
}

export interface UpdateFCodeInput {
  data: UpdateFCodeData;
  where: IdInput;
}

export interface DeleteFCodeInput {
  where?: IdInput;
}

export interface ReadFCodeWhereData {
  id?: string;
  englishError?: string;
  persianError?: string;
  color?: string;
  encodingNumber?: number;
  moduleId?: string;
}

export interface ReadFCodeInput {
  where?: ReadFCodeWhereData;
  pagination?: PaginationTakeAll | PaginationData;
}

export interface ReadFCodeOutput {
  count: number;
  data: FCodeModel[];
}

export interface CopyFCodeInput {
  moduleIds: string[];
  ids: string[];
}

export interface ReadPacketLogWhereData {
  id?: string;
  ip?: string;
  createdDate?: string;
  dateRange?: DateRange;
}

export interface ReadPacketLogInput {
  where?: ReadPacketLogWhereData;
  pagination?: PaginationData;
}

export enum ApplicationFunctionType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
  Value7 = 7,
  Value8 = 8,
  Value9 = 9,
  Value10 = 10,
  Value11 = 11,
  Value12 = 12,
  Value13 = 13,
  Value14 = 14,
}

export enum FC {
  Value3 = 3,
  Value16 = 16,
}

export interface ParsedRequestModel {
  /** @format date-time */
  date?: string;
  appFunction?: ApplicationFunctionType;
  transactionId: number;
  protocolId: number;
  messageLen: number;
  unitId: number;
  functionCode: FC;
  start: number;
  numberOfRegisters: number;
  numberOfBytes?: number;
  dataBuffer?: string;
}

export interface ParsedResponseModel {
  /** @format date-time */
  date?: string;
  appFunction?: ApplicationFunctionType;
  transactionId: number;
  protocolId: number;
  messageLen: number;
  unitId: number;
  functionCode: FC;
  start?: number;
  numberOfRegisters?: number;
  numberOfBytes?: number;
  dataBuffer?: string;
}

export interface PacketLogModel {
  id: string;
  request: string;
  response: string;
  parsedRequest?: ParsedRequestModel;
  parsedResponse?: ParsedResponseModel;
  ip: string;
  /** @format date-time */
  createdDate: string;
}

export interface ReadPacketLogOutput {
  count: number;
  data: PacketLogModel[];
}

export interface ReadUnknownPacketLogWhereData {
  id?: string;
  ip?: string;
  createdDate?: string;
  dateRange?: DateRange;
}

export interface ReadUnknownPacketLogInput {
  where?: ReadUnknownPacketLogWhereData;
  pagination?: PaginationData;
}

export interface UnknownPacketLogModel {
  id: string;
  data: string;
  ip: string;
  /** @format date-time */
  createdDate: string;
}

export interface ReadUnknownPacketLogOutput {
  count: number;
  data: UnknownPacketLogModel[];
}

export interface ReadTimeOutput {
  /** @format date-time */
  now: string;
}

export enum ApplicationFunctionModelEncodingNumberEnum {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
  Value7 = 7,
  Value8 = 8,
  Value9 = 9,
  Value10 = 10,
  Value11 = 11,
  Value12 = 12,
  Value13 = 13,
  Value14 = 14,
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Swagger APIs
 * @version 1.0
 * @contact
 *
 * The Swagger APIs description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  aaa = {
    /**
     * No description
     *
     * @tags Aaa
     * @name Login
     * @request POST:/aaa/login
     */
    login: (data: LoginInput, params: RequestParams = {}) =>
      this.request<LoginOutput, any>({
        path: `/aaa/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aaa
     * @name ChangePassword
     * @request POST:/aaa/changePassword
     */
    changePassword: (data: ChangePasswordInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/aaa/changePassword`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aaa
     * @name ChangeUsername
     * @request POST:/aaa/changeUsername
     */
    changeUsername: (data: ChangeUsernameInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/aaa/changeUsername`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aaa
     * @name ChangePasswordForUser
     * @request POST:/aaa/changePasswordForUser
     */
    changePasswordForUser: (data: ChangePasswordForUserInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/aaa/changePasswordForUser`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Aaa
     * @name Me
     * @request POST:/aaa/me
     */
    me: (params: RequestParams = {}) =>
      this.request<MeOutput, any>({
        path: `/aaa/me`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  system = {
    /**
     * No description
     *
     * @tags System
     * @name SetLoginExpirationTime
     * @request POST:/system/setLoginExpirationTime
     */
    setLoginExpirationTime: (data: SetLoginExpirationTimeInput, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/system/setLoginExpirationTime`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SetRegisterByteCount
     * @request POST:/system/setRegisterByteCount
     */
    setRegisterByteCount: (data: SetRegisterByteCountInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/system/setRegisterByteCount`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SetEncryptionEnable
     * @request POST:/system/setEncryptionEnable
     */
    setEncryptionEnable: (data: SetEncryptionEnabledInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/system/setEncryptionEnable`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SetAutoBackupPeriod
     * @request POST:/system/setAutoBackupPeriod
     */
    setAutoBackupPeriod: (data: SetAutoBackupPeriodInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/system/setAutoBackupPeriod`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SetModbusServerPort
     * @request POST:/system/setModbusServerPort
     */
    setModbusServerPort: (data: SetModbusServerPortInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/system/setModbusServerPort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name SetIntervalTimeToSendPackets
     * @request POST:/system/setIntervalTimeToSendPackets
     */
    setIntervalTimeToSendPackets: (data: SetIntervalTimeToSendPacketsInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/system/setIntervalTimeToSendPackets`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags System
     * @name ReadGlobalConfig
     * @request POST:/system/readGlobalConfig
     */
    readGlobalConfig: (params: RequestParams = {}) =>
      this.request<GlobalConfigModel, any>({
        path: `/system/readGlobalConfig`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * No description
     *
     * @tags Register
     * @name PortExport
     * @request POST:/register/portExport
     */
    portExport: (data: PortExportInput, params: RequestParams = {}) =>
      this.request<PortExport, any>({
        path: `/register/portExport`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Register
     * @name NodeModuleExport
     * @request POST:/register/nodeModuleExport
     */
    nodeModuleExport: (data: NodeModuleExportInput, params: RequestParams = {}) =>
      this.request<NodeModuleExport, any>({
        path: `/register/nodeModuleExport`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Register
     * @name NodeExport
     * @request POST:/register/nodeExport
     */
    nodeExport: (data: NodeExportInput, params: RequestParams = {}) =>
      this.request<NodeExport, any>({
        path: `/register/nodeExport`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Register
     * @name ReadNextAvalableEncodingNumber
     * @request POST:/register/readNextAvalableEncodingNumber
     */
    readNextAvalableEncodingNumber: (data: ReadNextAvalableEncodingNumberInput, params: RequestParams = {}) =>
      this.request<NextAvalableEncodingNumberModel, any>({
        path: `/register/readNextAvalableEncodingNumber`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  backup = {
    /**
     * No description
     *
     * @tags Backup
     * @name ReadBackup
     * @request POST:/backup/readBackup
     */
    readBackup: (params: RequestParams = {}) =>
      this.request<ReadBackupOutput, any>({
        path: `/backup/readBackup`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Backup
     * @name DeleteBackup
     * @request POST:/backup/deleteBackup
     */
    deleteBackup: (data: DeleteBackupInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/backup/deleteBackup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Backup
     * @name GetBackup
     * @request POST:/backup/getBackup
     */
    getBackup: (data: GetBackupInput, params: RequestParams = {}) =>
      this.request<BackupDatabaseOutput, any>({
        path: `/backup/getBackup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Backup
     * @name ImportBackup
     * @request POST:/backup/importBackup
     */
    importBackup: (data: ImportBackupInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/backup/importBackup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Backup
     * @name UploadBackupFile
     * @request POST:/backup/uploadBackupFile
     */
    uploadBackupFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessOutput, any>({
        path: `/backup/uploadBackupFile`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Backup
     * @name Rename
     * @request POST:/backup/rename
     */
    rename: (data: RenameBackupInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/backup/rename`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags User
     * @name Create
     * @request POST:/user/create
     */
    create: (data: CreateUserInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/user/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Update
     * @request POST:/user/update
     */
    update: (data: UpdateUserInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/user/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Read
     * @request POST:/user/read
     */
    read: (data: ReadUserInput, params: RequestParams = {}) =>
      this.request<ReadUserOutput, any>({
        path: `/user/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Activate
     * @request POST:/user/activate
     */
    activate: (data: ActivateUserInput, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/user/activate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name ReadUserLog
     * @request POST:/user/readUserLog
     */
    readUserLog: (data: ReadUserLogInput, params: RequestParams = {}) =>
      this.request<ReadUserLogOutput, any>({
        path: `/user/readUserLog`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  group = {
    /**
     * No description
     *
     * @tags Group
     * @name Create
     * @request POST:/group/create
     */
    create: (data: CreateGroupInput, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/group/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Group
     * @name Update
     * @request POST:/group/update
     */
    update: (data: UpdateGroupInput, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/group/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Group
     * @name Read
     * @request POST:/group/read
     */
    read: (data: ReadGroupInput, params: RequestParams = {}) =>
      this.request<ReadGroupOutput, any>({
        path: `/group/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Group
     * @name Delete
     * @request POST:/group/delete
     */
    delete: (data: DeleteGroupInput, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/group/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  room = {
    /**
     * No description
     *
     * @tags Room
     * @name Create
     * @request POST:/room/create
     */
    create: (data: CreateRoomInput, params: RequestParams = {}) =>
      this.request<RoomModel, any>({
        path: `/room/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Room
     * @name Update
     * @request POST:/room/update
     */
    update: (data: UpdateRoomInput, params: RequestParams = {}) =>
      this.request<RoomModel, any>({
        path: `/room/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Room
     * @name Read
     * @request POST:/room/read
     */
    read: (data: ReadRoomInput, params: RequestParams = {}) =>
      this.request<ReadRoomOutput, any>({
        path: `/room/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Room
     * @name Delete
     * @request POST:/room/delete
     */
    delete: (data: DeleteRoomInput, params: RequestParams = {}) =>
      this.request<RoomModel, any>({
        path: `/room/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  cabinet = {
    /**
     * No description
     *
     * @tags Cabinet
     * @name Create
     * @request POST:/cabinet/create
     */
    create: (data: CreateCabinetInput, params: RequestParams = {}) =>
      this.request<CabinetModel, any>({
        path: `/cabinet/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cabinet
     * @name Update
     * @request POST:/cabinet/update
     */
    update: (data: UpdateCabinetInput, params: RequestParams = {}) =>
      this.request<CabinetModel, any>({
        path: `/cabinet/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cabinet
     * @name Read
     * @request POST:/cabinet/read
     */
    read: (data: ReadCabinetInput, params: RequestParams = {}) =>
      this.request<ReadCabinetOutput, any>({
        path: `/cabinet/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Cabinet
     * @name Delete
     * @request POST:/cabinet/delete
     */
    delete: (data: DeleteCabinetInput, params: RequestParams = {}) =>
      this.request<CabinetModel, any>({
        path: `/cabinet/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  channel = {
    /**
     * No description
     *
     * @tags Channel
     * @name Create
     * @request POST:/channel/create
     */
    create: (data: CreateChannelInput, params: RequestParams = {}) =>
      this.request<ChannelModel, any>({
        path: `/channel/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channel
     * @name Update
     * @request POST:/channel/update
     */
    update: (data: UpdateChannelInput, params: RequestParams = {}) =>
      this.request<ChannelModel, any>({
        path: `/channel/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channel
     * @name Read
     * @request POST:/channel/read
     */
    read: (data: ReadChannelInput, params: RequestParams = {}) =>
      this.request<ReadChannelOutput, any>({
        path: `/channel/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Channel
     * @name Delete
     * @request POST:/channel/delete
     */
    delete: (data: DeleteChannelInput, params: RequestParams = {}) =>
      this.request<ChannelModel, any>({
        path: `/channel/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  node = {
    /**
     * No description
     *
     * @tags Node
     * @name CreateNode
     * @request POST:/node/createNode
     */
    createNode: (data: CreateNodeInput, params: RequestParams = {}) =>
      this.request<NodeModel, any>({
        path: `/node/createNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name UpdateNode
     * @request POST:/node/updateNode
     */
    updateNode: (data: UpdateNodeInput, params: RequestParams = {}) =>
      this.request<NodeModel, any>({
        path: `/node/updateNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name ReadNode
     * @request POST:/node/readNode
     */
    readNode: (data: ReadNodeInput, params: RequestParams = {}) =>
      this.request<ReadNodeOutput, any>({
        path: `/node/readNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name DeleteNode
     * @request POST:/node/deleteNode
     */
    deleteNode: (data: DeleteNodeInput, params: RequestParams = {}) =>
      this.request<NodeModel, any>({
        path: `/node/deleteNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name ReadNodeDetails
     * @request POST:/node/readNodeDetails
     */
    readNodeDetails: (data: ReadNodeDetailsInput, params: RequestParams = {}) =>
      this.request<NodeDetailsModel, any>({
        path: `/node/readNodeDetails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name AddModules
     * @request POST:/node/addModules
     */
    addModules: (data: AddNodeModuleInput, params: RequestParams = {}) =>
      this.request<NodeModuleModel[], any>({
        path: `/node/addModules`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name EditNodeModuleAliasName
     * @request POST:/node/editNodeModuleAliasName
     */
    editNodeModuleAliasName: (data: EditNodeModuleAliasName, params: RequestParams = {}) =>
      this.request<NodeModuleModel, any>({
        path: `/node/editNodeModuleAliasName`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name UpdateModuleOrder
     * @request POST:/node/updateModuleOrder
     */
    updateModuleOrder: (data: UpdateNodeModuleOrdersInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/node/updateModuleOrder`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name DeleteModule
     * @request POST:/node/deleteModule
     */
    deleteModule: (data: DeleteNodeModuleInput, params: RequestParams = {}) =>
      this.request<NodeModuleModel, any>({
        path: `/node/deleteModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name GetNodeIps
     * @request POST:/node/getNodeIps
     */
    getNodeIps: (data: GetNodeIpsInput, params: RequestParams = {}) =>
      this.request<GetNodeIpsOutput, any>({
        path: `/node/getNodeIps`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name SetNodeTime
     * @request POST:/node/setNodeTime
     */
    setNodeTime: (data: SetNodeTimeInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/node/setNodeTime`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name ReadNodeTime
     * @request POST:/node/readNodeTime
     */
    readNodeTime: (data: ReadNodeTimeInput, params: RequestParams = {}) =>
      this.request<ReadNodeTimeOutput, any>({
        path: `/node/readNodeTime`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name ReadNodeModule
     * @request POST:/node/readNodeModule
     */
    readNodeModule: (data: ReadNodeModuleInput, params: RequestParams = {}) =>
      this.request<ReadNodeModuleOutput, any>({
        path: `/node/readNodeModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Node
     * @name DuplicateNode
     * @request POST:/node/duplicateNode
     */
    duplicateNode: (data: DuplicateNodeInput, params: RequestParams = {}) =>
      this.request<NodeModel, any>({
        path: `/node/duplicateNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodeProps = {
    /**
     * No description
     *
     * @tags NodeProps
     * @name CreateNodePropertyGroup
     * @request POST:/nodeProps/createNodePropertyGroup
     */
    createNodePropertyGroup: (data: CreateNodePropertyGroupInput, params: RequestParams = {}) =>
      this.request<NodePropertyGroupModel, any>({
        path: `/nodeProps/createNodePropertyGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name UpdateNodePropertyGroup
     * @request POST:/nodeProps/updateNodePropertyGroup
     */
    updateNodePropertyGroup: (data: UpdateNodePropertyGroupInput, params: RequestParams = {}) =>
      this.request<NodePropertyGroupModel, any>({
        path: `/nodeProps/updateNodePropertyGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name ReadNodePropertyGroup
     * @request POST:/nodeProps/readNodePropertyGroup
     */
    readNodePropertyGroup: (data: ReadNodePropertyGroupInput, params: RequestParams = {}) =>
      this.request<ReadNodePropertyGroupOutput, any>({
        path: `/nodeProps/readNodePropertyGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name DeleteNodePropertyGroup
     * @request POST:/nodeProps/deleteNodePropertyGroup
     */
    deleteNodePropertyGroup: (data: DeleteNodePropertyGroupInput, params: RequestParams = {}) =>
      this.request<NodePropertyGroupModel, any>({
        path: `/nodeProps/deleteNodePropertyGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name CreateNodeProperty
     * @request POST:/nodeProps/createNodeProperty
     */
    createNodeProperty: (data: CreateNodePropertyInput, params: RequestParams = {}) =>
      this.request<NodePropertyModel, any>({
        path: `/nodeProps/createNodeProperty`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name UpdateNodeProperty
     * @request POST:/nodeProps/updateNodeProperty
     */
    updateNodeProperty: (data: UpdateNodePropertyInput, params: RequestParams = {}) =>
      this.request<NodePropertyModel, any>({
        path: `/nodeProps/updateNodeProperty`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name ReadNodeProperty
     * @request POST:/nodeProps/readNodeProperty
     */
    readNodeProperty: (data: ReadNodePropertyInput, params: RequestParams = {}) =>
      this.request<ReadNodePropertyOutput, any>({
        path: `/nodeProps/readNodeProperty`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeProps
     * @name DeleteNodeProperty
     * @request POST:/nodeProps/deleteNodeProperty
     */
    deleteNodeProperty: (data: DeleteNodePropertyInput, params: RequestParams = {}) =>
      this.request<NodePropertyModel, any>({
        path: `/nodeProps/deleteNodeProperty`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodeModule = {
    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadNodeModuleDetails
     * @request POST:/nodeModule/readNodeModuleDetails
     */
    readNodeModuleDetails: (data: ReadNodeModuleDetailsInput, params: RequestParams = {}) =>
      this.request<NodeModuleDetailsModel, any>({
        path: `/nodeModule/readNodeModuleDetails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadNodeLedIntervally
     * @request POST:/nodeModule/readNodeLedIntervally
     */
    readNodeLedIntervally: (data: ReadNodeLedIntervallyInput, params: RequestParams = {}) =>
      this.request<ReadNodeLedIntervallyOutput, any>({
        path: `/nodeModule/readNodeLedIntervally`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadNodeLedLastData
     * @request POST:/nodeModule/readNodeLedLastData
     */
    readNodeLedLastData: (data: ReadNodeLedIntervallyInput, params: RequestParams = {}) =>
      this.request<ReadNodeLedIntervallyOutput, any>({
        path: `/nodeModule/readNodeLedLastData`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name WriteNodeLed
     * @request POST:/nodeModule/writeNodeLed
     */
    writeNodeLed: (data: WriteNodeLedInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/writeNodeLed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name SetPortFeatureValue
     * @request POST:/nodeModule/setPortFeatureValue
     */
    setPortFeatureValue: (data: SetFeatureValueInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/setPortFeatureValue`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name SetNodeFeatureCalibrationValues
     * @request POST:/nodeModule/setNodeFeatureCalibrationValues
     */
    setNodeFeatureCalibrationValues: (data: SetNodeFeatureCalibrationValueInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/setNodeFeatureCalibrationValues`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadPortFeatureValue
     * @request POST:/nodeModule/readPortFeatureValue
     */
    readPortFeatureValue: (data: WhichNodeModulePortInput, params: RequestParams = {}) =>
      this.request<ReadPortFeatureValueOutput, any>({
        path: `/nodeModule/readPortFeatureValue`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name FormatPort
     * @request POST:/nodeModule/formatPort
     */
    formatPort: (data: WhichNodeModulePortInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/formatPort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name SetNodeIntervalTime
     * @request POST:/nodeModule/setNodeIntervalTime
     */
    setNodeIntervalTime: (data: SetNodeIntervalTimeInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/setNodeIntervalTime`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadMonitoringFeatureOnline
     * @request POST:/nodeModule/readMonitoringFeatureOnline
     */
    readMonitoringFeatureOnline: (data: WhichNodeModulePortInput, params: RequestParams = {}) =>
      this.request<ReadPortMonitoringFeatureValueOutput, any>({
        path: `/nodeModule/readMonitoringFeatureOnline`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadMonitoringFeatureLastData
     * @request POST:/nodeModule/readMonitoringFeatureLastData
     */
    readMonitoringFeatureLastData: (data: WhichNodeModulePortInput, params: RequestParams = {}) =>
      this.request<ReadPortMonitoringFeatureValueOutput, any>({
        path: `/nodeModule/readMonitoringFeatureLastData`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ResetMonitoringFeatureForce
     * @request POST:/nodeModule/resetMonitoringFeatureForce
     */
    resetMonitoringFeatureForce: (data: MonitoringFeatureForceInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/resetMonitoringFeatureForce`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ApplyMonitoringFeatureForce
     * @request POST:/nodeModule/applyMonitoringFeatureForce
     */
    applyMonitoringFeatureForce: (data: MonitoringFeatureForceInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/applyMonitoringFeatureForce`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadFeatureValue
     * @request POST:/nodeModule/readFeatureValue
     */
    readFeatureValue: (data: ReadFeatureValueInput, params: RequestParams = {}) =>
      this.request<ReadNodeFeatureValueOutput, any>({
        path: `/nodeModule/readFeatureValue`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name ReadAllNodesMonitoringFeatures
     * @request POST:/nodeModule/readAllNodesMonitoringFeatures
     */
    readAllNodesMonitoringFeatures: (data: ReadAllNodesMonitoringFeaturesInput, params: RequestParams = {}) =>
      this.request<ReadAllNodesMonitoringFeaturesOutput, any>({
        path: `/nodeModule/readAllNodesMonitoringFeatures`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name SetNodeFeatureValueTag
     * @request POST:/nodeModule/setNodeFeatureValueTag
     */
    setNodeFeatureValueTag: (data: SetFeatureValueTagInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/setNodeFeatureValueTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name SetNodeMonitoringFeatureTag
     * @request POST:/nodeModule/setNodeMonitoringFeatureTag
     */
    setNodeMonitoringFeatureTag: (data: SetNodeMonitoringFeatureTagInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/setNodeMonitoringFeatureTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name DownloadNodeFeatureValueExcel
     * @request POST:/nodeModule/downloadNodeFeatureValueExcel
     */
    downloadNodeFeatureValueExcel: (params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/nodeModule/downloadNodeFeatureValueExcel`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name DownloadNodeMonitoringFeatureExcel
     * @request POST:/nodeModule/downloadNodeMonitoringFeatureExcel
     */
    downloadNodeMonitoringFeatureExcel: (params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/nodeModule/downloadNodeMonitoringFeatureExcel`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name DownloadNodeLedNameExcel
     * @request POST:/nodeModule/downloadNodeLedNameExcel
     */
    downloadNodeLedNameExcel: (params: RequestParams = {}) =>
      this.request<any, File>({
        path: `/nodeModule/downloadNodeLedNameExcel`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name UploadNodeFeatureValueExcel
     * @request POST:/nodeModule/uploadNodeFeatureValueExcel
     */
    uploadNodeFeatureValueExcel: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/uploadNodeFeatureValueExcel`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name UploadNodeMonitoringFeaturesExcel
     * @request POST:/nodeModule/uploadNodeMonitoringFeaturesExcel
     */
    uploadNodeMonitoringFeaturesExcel: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/uploadNodeMonitoringFeaturesExcel`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name UploadNodeLedNameExcel
     * @request POST:/nodeModule/uploadNodeLedNameExcel
     */
    uploadNodeLedNameExcel: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessOutput, any>({
        path: `/nodeModule/uploadNodeLedNameExcel`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeModule
     * @name UpdateNodeModuleCoefficients
     * @request POST:/nodeModule/updateNodeModuleCoefficients
     */
    updateNodeModuleCoefficients: (data: UpdateNodeModuleCoefficientsInput, params: RequestParams = {}) =>
      this.request<NodeModuleModel, any>({
        path: `/nodeModule/updateNodeModuleCoefficients`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodeLed = {
    /**
     * No description
     *
     * @tags NodeLed
     * @name CreateNodeLed
     * @request POST:/nodeLed/createNodeLed
     */
    createNodeLed: (data: CreateNodeLedInput, params: RequestParams = {}) =>
      this.request<NodeLedModel, any>({
        path: `/nodeLed/createNodeLed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name UpdateNodeLed
     * @request POST:/nodeLed/updateNodeLed
     */
    updateNodeLed: (data: UpdateNodeLedInput, params: RequestParams = {}) =>
      this.request<NodeLedModel, any>({
        path: `/nodeLed/updateNodeLed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name ReadNodeLed
     * @request POST:/nodeLed/readNodeLed
     */
    readNodeLed: (data: ReadNodeLedInput, params: RequestParams = {}) =>
      this.request<ReadNodeLedOutput, any>({
        path: `/nodeLed/readNodeLed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name DeleteNodeLed
     * @request POST:/nodeLed/deleteNodeLed
     */
    deleteNodeLed: (data: DeleteNodeLedInput, params: RequestParams = {}) =>
      this.request<NodeLedModel, any>({
        path: `/nodeLed/deleteNodeLed`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name UpdateNodeLedOrders
     * @request POST:/nodeLed/updateNodeLedOrders
     */
    updateNodeLedOrders: (data: UpdateNodeLedOrdersInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeLed/updateNodeLedOrders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name UpdateNodeLedName
     * @request POST:/nodeLed/updateNodeLedName
     */
    updateNodeLedName: (data: UpdateNodeLedNameInput, params: RequestParams = {}) =>
      this.request<NodeLedModel, any>({
        path: `/nodeLed/updateNodeLedName`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeLed
     * @name CopyNodeLedGroup
     * @request POST:/nodeLed/copyNodeLedGroup
     */
    copyNodeLedGroup: (data: CopyNodeLedGroupInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/nodeLed/copyNodeLedGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodeFault = {
    /**
     * No description
     *
     * @tags NodeFault
     * @name CreateNodeFault
     * @request POST:/nodeFault/createNodeFault
     */
    createNodeFault: (data: CreateNodeFaultInput, params: RequestParams = {}) =>
      this.request<NodeFaultModel, any>({
        path: `/nodeFault/createNodeFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeFault
     * @name UpdateNodeFault
     * @request POST:/nodeFault/updateNodeFault
     */
    updateNodeFault: (data: UpdateNodeFaultInput, params: RequestParams = {}) =>
      this.request<NodeFaultModel, any>({
        path: `/nodeFault/updateNodeFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeFault
     * @name ReadNodeFault
     * @request POST:/nodeFault/readNodeFault
     */
    readNodeFault: (data: ReadNodeFaultInput, params: RequestParams = {}) =>
      this.request<ReadNodeFaultOutput, any>({
        path: `/nodeFault/readNodeFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags NodeFault
     * @name DeleteNodeFault
     * @request POST:/nodeFault/deleteNodeFault
     */
    deleteNodeFault: (data: DeleteNodeFaultInput, params: RequestParams = {}) =>
      this.request<NodeFaultModel, any>({
        path: `/nodeFault/deleteNodeFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  nodeTftp = {
    /**
     * No description
     *
     * @tags NodeTftp
     * @name ExportNodeAndSendWithTftp
     * @request POST:/node-tftp/exportNodeAndSendWithTFTP
     */
    exportNodeAndSendWithTftp: (data: NodeExportInput, params: RequestParams = {}) =>
      this.request<NodeExport, any>({
        path: `/node-tftp/exportNodeAndSendWithTFTP`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  feature = {
    /**
     * No description
     *
     * @tags Feature
     * @name CreateFeature
     * @request POST:/feature/createFeature
     */
    createFeature: (data: CreateFeatureInput, params: RequestParams = {}) =>
      this.request<FeatureModel, any>({
        path: `/feature/createFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name UpdateFeature
     * @request POST:/feature/updateFeature
     */
    updateFeature: (data: UpdateFeatureInput, params: RequestParams = {}) =>
      this.request<FeatureModel, any>({
        path: `/feature/updateFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name ReadFeature
     * @request POST:/feature/readFeature
     */
    readFeature: (data: ReadFeatureInput, params: RequestParams = {}) =>
      this.request<ReadFeatureOutput, any>({
        path: `/feature/readFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feature
     * @name DeleteFeature
     * @request POST:/feature/deleteFeature
     */
    deleteFeature: (data: DeleteFeatureInput, params: RequestParams = {}) =>
      this.request<FeatureModel, any>({
        path: `/feature/deleteFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  monitoringFeature = {
    /**
     * No description
     *
     * @tags MonitoringFeature
     * @name CreateMonitoringFeature
     * @request POST:/monitoringFeature/createMonitoringFeature
     */
    createMonitoringFeature: (data: CreateMonitoringFeatureInput, params: RequestParams = {}) =>
      this.request<MonitoringFeatureModel, any>({
        path: `/monitoringFeature/createMonitoringFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MonitoringFeature
     * @name UpdateMonitoringFeature
     * @request POST:/monitoringFeature/updateMonitoringFeature
     */
    updateMonitoringFeature: (data: UpdateMonitoringFeatureInput, params: RequestParams = {}) =>
      this.request<MonitoringFeatureModel, any>({
        path: `/monitoringFeature/updateMonitoringFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MonitoringFeature
     * @name ReadMonitoringFeature
     * @request POST:/monitoringFeature/readMonitoringFeature
     */
    readMonitoringFeature: (data: ReadMonitoringFeatureInput, params: RequestParams = {}) =>
      this.request<ReadMonitoringFeatureOutput, any>({
        path: `/monitoringFeature/readMonitoringFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags MonitoringFeature
     * @name DeleteMonitoringFeature
     * @request POST:/monitoringFeature/deleteMonitoringFeature
     */
    deleteMonitoringFeature: (data: DeleteMonitoringFeatureInput, params: RequestParams = {}) =>
      this.request<MonitoringFeatureModel, any>({
        path: `/monitoringFeature/deleteMonitoringFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  module = {
    /**
     * No description
     *
     * @tags Module
     * @name CreateModuleType
     * @request POST:/module/createModuleType
     */
    createModuleType: (data: CreateModuleTypeInput, params: RequestParams = {}) =>
      this.request<ModuleTypeModel, any>({
        path: `/module/createModuleType`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name UpdateModuleType
     * @request POST:/module/updateModuleType
     */
    updateModuleType: (data: UpdateModuleTypeInput, params: RequestParams = {}) =>
      this.request<ModuleTypeModel, any>({
        path: `/module/updateModuleType`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name ReadModuleType
     * @request POST:/module/readModuleType
     */
    readModuleType: (data: ReadModuleTypeInput, params: RequestParams = {}) =>
      this.request<ReadModuleTypeOutput, any>({
        path: `/module/readModuleType`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name DeleteModuleType
     * @request POST:/module/deleteModuleType
     */
    deleteModuleType: (data: DeleteModuleTypeInput, params: RequestParams = {}) =>
      this.request<ModuleTypeModel, any>({
        path: `/module/deleteModuleType`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name CreateModule
     * @request POST:/module/createModule
     */
    createModule: (data: CreateModuleInput, params: RequestParams = {}) =>
      this.request<ModuleModel, any>({
        path: `/module/createModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name UpdateModule
     * @request POST:/module/updateModule
     */
    updateModule: (data: UpdateModuleInput, params: RequestParams = {}) =>
      this.request<ModuleModel, any>({
        path: `/module/updateModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name ReadModule
     * @request POST:/module/readModule
     */
    readModule: (data: ReadModuleInput, params: RequestParams = {}) =>
      this.request<ReadModuleOutput, any>({
        path: `/module/readModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name DeleteModule
     * @request POST:/module/deleteModule
     */
    deleteModule: (data: DeleteModuleInput, params: RequestParams = {}) =>
      this.request<ModuleModel, any>({
        path: `/module/deleteModule`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name UpdateModulePortOrders
     * @request POST:/module/updateModulePortOrders
     */
    updateModulePortOrders: (data: UpdatePortOrdersInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/module/updateModulePortOrders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Module
     * @name ReadModuleDetails
     * @request POST:/module/readModuleDetails
     */
    readModuleDetails: (data: ReadModuleDetailsInput, params: RequestParams = {}) =>
      this.request<ModuleDetailsModel, any>({
        path: `/module/readModuleDetails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  port = {
    /**
     * No description
     *
     * @tags Port
     * @name CreatePort
     * @request POST:/port/createPort
     */
    createPort: (data: CreatePortInput, params: RequestParams = {}) =>
      this.request<PortModel, any>({
        path: `/port/createPort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name UpdatePort
     * @request POST:/port/updatePort
     */
    updatePort: (data: UpdatePortInput, params: RequestParams = {}) =>
      this.request<PortModel, any>({
        path: `/port/updatePort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name ReadPort
     * @request POST:/port/readPort
     */
    readPort: (data: ReadPortInput, params: RequestParams = {}) =>
      this.request<ReadPortOutput, any>({
        path: `/port/readPort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name DeletePort
     * @request POST:/port/deletePort
     */
    deletePort: (data: DeletePortInput, params: RequestParams = {}) =>
      this.request<PortModel, any>({
        path: `/port/deletePort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name UpdateMonitoringFeatureOrders
     * @request POST:/port/updateMonitoringFeatureOrders
     */
    updateMonitoringFeatureOrders: (data: UpdateMonitoringFeatureOrdersInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/port/updateMonitoringFeatureOrders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name AddFeatures
     * @request POST:/port/addFeatures
     */
    addFeatures: (data: AddFeatureInput, params: RequestParams = {}) =>
      this.request<PortFeatureModel[], any>({
        path: `/port/addFeatures`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name RemoveFeature
     * @request POST:/port/removeFeature
     */
    removeFeature: (data: RemoveFeatureInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/port/removeFeature`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name UpdateFeatureOrders
     * @request POST:/port/updateFeatureOrders
     */
    updateFeatureOrders: (data: UpdateFeatureOrdersInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/port/updateFeatureOrders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name CopyPortDataToAnotherPort
     * @request POST:/port/copyPortDataToAnotherPort
     */
    copyPortDataToAnotherPort: (data: CopyPortDataToAnotherPortInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/port/copyPortDataToAnotherPort`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Port
     * @name DuplicatePortData
     * @request POST:/port/duplicatePortData
     */
    duplicatePortData: (data: DuplicatePortDataInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/port/duplicatePortData`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  moduleFault = {
    /**
     * No description
     *
     * @tags ModuleFault
     * @name CreateModuleFault
     * @request POST:/moduleFault/createModuleFault
     */
    createModuleFault: (data: CreateModuleFaultInput, params: RequestParams = {}) =>
      this.request<ModuleFaultModel, any>({
        path: `/moduleFault/createModuleFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ModuleFault
     * @name UpdateModuleFault
     * @request POST:/moduleFault/updateModuleFault
     */
    updateModuleFault: (data: UpdateModuleFaultInput, params: RequestParams = {}) =>
      this.request<ModuleFaultModel, any>({
        path: `/moduleFault/updateModuleFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ModuleFault
     * @name ReadModuleFault
     * @request POST:/moduleFault/readModuleFault
     */
    readModuleFault: (data: ReadModuleFaultInput, params: RequestParams = {}) =>
      this.request<ReadModuleFaultOutput, any>({
        path: `/moduleFault/readModuleFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ModuleFault
     * @name DeleteModuleFault
     * @request POST:/moduleFault/deleteModuleFault
     */
    deleteModuleFault: (data: DeleteModuleFaultInput, params: RequestParams = {}) =>
      this.request<ModuleFaultModel, any>({
        path: `/moduleFault/deleteModuleFault`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  unit = {
    /**
     * No description
     *
     * @tags Unit
     * @name Create
     * @request POST:/unit/create
     */
    create: (data: CreateUnitInput, params: RequestParams = {}) =>
      this.request<UnitModel, any>({
        path: `/unit/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Update
     * @request POST:/unit/update
     */
    update: (data: UpdateUnitInput, params: RequestParams = {}) =>
      this.request<UnitModel, any>({
        path: `/unit/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Read
     * @request POST:/unit/read
     */
    read: (data: ReadUnitInput, params: RequestParams = {}) =>
      this.request<ReadUnitOutput, any>({
        path: `/unit/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name Delete
     * @request POST:/unit/delete
     */
    delete: (data: DeleteUnitInput, params: RequestParams = {}) =>
      this.request<UnitModel, any>({
        path: `/unit/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name CreateUnitGroup
     * @request POST:/unit/createUnitGroup
     */
    createUnitGroup: (data: CreateUnitGroupInput, params: RequestParams = {}) =>
      this.request<UnitGroupModel, any>({
        path: `/unit/createUnitGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name DeleteUnitGroup
     * @request POST:/unit/deleteUnitGroup
     */
    deleteUnitGroup: (data: DeleteUnitGroupInput, params: RequestParams = {}) =>
      this.request<UnitGroupModel, any>({
        path: `/unit/deleteUnitGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name UpdateUnitGroup
     * @request POST:/unit/updateUnitGroup
     */
    updateUnitGroup: (data: UpdateUnitGroupInput, params: RequestParams = {}) =>
      this.request<UnitGroupModel, any>({
        path: `/unit/updateUnitGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Unit
     * @name ReadUnitGroup
     * @request POST:/unit/readUnitGroup
     */
    readUnitGroup: (data: ReadUnitGroupInput, params: RequestParams = {}) =>
      this.request<ReadUnitGroupOutput, any>({
        path: `/unit/readUnitGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  monitoring = {
    /**
     * No description
     *
     * @tags Monitoring
     * @name RoomDetails
     * @request POST:/monitoring/roomDetails
     */
    roomDetails: (data: RoomDetailsInput, params: RequestParams = {}) =>
      this.request<RoomDetailsOutput, any>({
        path: `/monitoring/roomDetails`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetModuleFaultsInNode
     * @request POST:/monitoring/getModuleFaultsInNode
     */
    getModuleFaultsInNode: (data: GetModuleFaultsInNodeInput, params: RequestParams = {}) =>
      this.request<GetModuleFaultsInNodeOutput, any>({
        path: `/monitoring/getModuleFaultsInNode`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetNodeModuleFCodesIntervally
     * @request POST:/monitoring/getNodeModuleFCodesIntervally
     */
    getNodeModuleFCodesIntervally: (data: WhichNodeModuleInput, params: RequestParams = {}) =>
      this.request<GetNodeModuleFCodesIntervallyOutput, any>({
        path: `/monitoring/getNodeModuleFCodesIntervally`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetMonitoringFeaturesDataWithSwTag
     * @request POST:/monitoring/getMonitoringFeaturesDataWithSwTag
     */
    getMonitoringFeaturesDataWithSwTag: (data: GetMonitoringFeaturesDataWithSwTagInput, params: RequestParams = {}) =>
      this.request<GetMonitoringFeaturesDataWithSwTagOutput, any>({
        path: `/monitoring/getMonitoringFeaturesDataWithSwTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetMonitoringFeatureValuesIntervally
     * @request POST:/monitoring/getMonitoringFeatureValuesIntervally
     */
    getMonitoringFeatureValuesIntervally: (
      data: GetMonitoringFeatureValuesIntervallyInput,
      params: RequestParams = {},
    ) =>
      this.request<ReadPortMonitoringFeatureValueOutput, any>({
        path: `/monitoring/getMonitoringFeatureValuesIntervally`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetForcedMonitoringFeatures
     * @request POST:/monitoring/getForcedMonitoringFeatures
     */
    getForcedMonitoringFeatures: (data: GetForcedMonitoringFeaturesInput, params: RequestParams = {}) =>
      this.request<ReadForcedMonitoringFeaturesOutput, any>({
        path: `/monitoring/getForcedMonitoringFeatures`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetMonitoringFeaturesLastValues
     * @request POST:/monitoring/getMonitoringFeaturesLastValues
     */
    getMonitoringFeaturesLastValues: (data: GetMonitoringFeatureValuesIntervallyInput, params: RequestParams = {}) =>
      this.request<ReadPortMonitoringFeatureValueOutputWithId, any>({
        path: `/monitoring/getMonitoringFeaturesLastValues`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name SetIntervallTimeForAllNodes
     * @request POST:/monitoring/setIntervallTimeForAllNodes
     */
    setIntervallTimeForAllNodes: (data: SetIntervallTimeForAllNodesInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/monitoring/setIntervallTimeForAllNodes`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetNodesHealthIntervally
     * @request POST:/monitoring/getNodesHealthIntervally
     */
    getNodesHealthIntervally: (params: RequestParams = {}) =>
      this.request<GetNodesHealthOutput, any>({
        path: `/monitoring/getNodesHealthIntervally`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetNodesStorageIntervally
     * @request POST:/monitoring/getNodesStorageIntervally
     */
    getNodesStorageIntervally: (data: GetNodesStorageIntervallyInput, params: RequestParams = {}) =>
      this.request<GetNodesStorageIntervallyOutput, any>({
        path: `/monitoring/getNodesStorageIntervally`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Monitoring
     * @name GetNodesStoragesLastData
     * @request POST:/monitoring/getNodesStoragesLastData
     */
    getNodesStoragesLastData: (params: RequestParams = {}) =>
      this.request<GetNodesStorageIntervallyOutput, any>({
        path: `/monitoring/getNodesStoragesLastData`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  tag = {
    /**
     * No description
     *
     * @tags Tag
     * @name CreateTag
     * @request POST:/tag/createTag
     */
    createTag: (data: CreateTagInput, params: RequestParams = {}) =>
      this.request<TagModel, any>({
        path: `/tag/createTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name UpdateTag
     * @request POST:/tag/updateTag
     */
    updateTag: (data: UpdateTagInput, params: RequestParams = {}) =>
      this.request<TagModel, any>({
        path: `/tag/updateTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name ReadTag
     * @request POST:/tag/readTag
     */
    readTag: (data: ReadTagInput, params: RequestParams = {}) =>
      this.request<ReadTagOutput, any>({
        path: `/tag/readTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name DeleteTag
     * @request POST:/tag/deleteTag
     */
    deleteTag: (data: DeleteTagInput, params: RequestParams = {}) =>
      this.request<TagModel, any>({
        path: `/tag/deleteTag`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name CreateBulkTag
     * @request POST:/tag/createBulkTag
     */
    createBulkTag: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessOutput, any>({
        path: `/tag/createBulkTag`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name CreateTagGroup
     * @request POST:/tag/createTagGroup
     */
    createTagGroup: (data: CreateTagGroupInput, params: RequestParams = {}) =>
      this.request<TagGroupModel, any>({
        path: `/tag/createTagGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name UpdateTagGroup
     * @request POST:/tag/updateTagGroup
     */
    updateTagGroup: (data: UpdateTagGroupInput, params: RequestParams = {}) =>
      this.request<TagGroupModel, any>({
        path: `/tag/updateTagGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name ReadTagGroup
     * @request POST:/tag/readTagGroup
     */
    readTagGroup: (data: ReadTagGroupInput, params: RequestParams = {}) =>
      this.request<ReadTagGroupOutput, any>({
        path: `/tag/readTagGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tag
     * @name DeleteTagGroup
     * @request POST:/tag/deleteTagGroup
     */
    deleteTagGroup: (data: DeleteTagGroupInput, params: RequestParams = {}) =>
      this.request<TagGroupModel, any>({
        path: `/tag/deleteTagGroup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  applicationFunction = {
    /**
     * No description
     *
     * @tags ApplicationFunction
     * @name ReadApplicationFunction
     * @request POST:/applicationFunction/readApplicationFunction
     */
    readApplicationFunction: (params: RequestParams = {}) =>
      this.request<ReadApplicationFunctionOutput, any>({
        path: `/applicationFunction/readApplicationFunction`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
  fcode = {
    /**
     * No description
     *
     * @tags FCode
     * @name Create
     * @request POST:/fcode/create
     */
    create: (data: CreateFCodeInput, params: RequestParams = {}) =>
      this.request<FCodeModel, any>({
        path: `/fcode/create`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FCode
     * @name Update
     * @request POST:/fcode/update
     */
    update: (data: UpdateFCodeInput, params: RequestParams = {}) =>
      this.request<FCodeModel, any>({
        path: `/fcode/update`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FCode
     * @name Delete
     * @request POST:/fcode/delete
     */
    delete: (data: DeleteFCodeInput, params: RequestParams = {}) =>
      this.request<FCodeModel, any>({
        path: `/fcode/delete`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FCode
     * @name Read
     * @request POST:/fcode/read
     */
    read: (data: ReadFCodeInput, params: RequestParams = {}) =>
      this.request<ReadFCodeOutput, any>({
        path: `/fcode/read`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FCode
     * @name Copy
     * @request POST:/fcode/copy
     */
    copy: (data: CopyFCodeInput, params: RequestParams = {}) =>
      this.request<SuccessOutput, any>({
        path: `/fcode/copy`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  packetLog = {
    /**
     * No description
     *
     * @tags PacketLog
     * @name ReadPacketLogs
     * @request POST:/packet-log/readPacketLogs
     */
    readPacketLogs: (data: ReadPacketLogInput, params: RequestParams = {}) =>
      this.request<ReadPacketLogOutput, any>({
        path: `/packet-log/readPacketLogs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags PacketLog
     * @name ReadUnknownPacketLogs
     * @request POST:/packet-log/readUnknownPacketLogs
     */
    readUnknownPacketLogs: (data: ReadUnknownPacketLogInput, params: RequestParams = {}) =>
      this.request<ReadUnknownPacketLogOutput, any>({
        path: `/packet-log/readUnknownPacketLogs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  time = {
    /**
     * No description
     *
     * @tags Time
     * @name ReadTime
     * @request POST:/time/readTime
     */
    readTime: (params: RequestParams = {}) =>
      this.request<ReadTimeOutput, any>({
        path: `/time/readTime`,
        method: "POST",
        format: "json",
        ...params,
      }),
  };
}
