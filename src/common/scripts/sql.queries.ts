export const getAllNodesFeaturesQuery = `
select
	CAST(COUNT(*) OVER () as INT) as "totalCount"
	, tg.name as "tagGroupName"
	, nm.id as "nodeModuleId"
	, nm."aliasName" as "nodeModuleAliasName"
	, n.id as "nodeId"
	, n."name" as "nodeName"
	, m.id as "moduleId"
	, m."name" as "moduleName"
	, p.name as "portName"
	, p."order" as "portOrder"
	, pf.id as "portFeatureId"
	, f.id as "featureId"
	, f."linearCoefficient" as "linearCoefficient"
	, f."linearConstant" as "linearConstant"
	, f."powerExponent" as "powerExponent"
	, f.name as "featureName"
	, r.id as "roomId"
	, r.name as "roomName"
	, c.id as "cabinetId"
	, c.name as "cabinetName"
	, ch.id as "channelId"
	, ch.name as "channelName"
	, ng.id as "nodeGroupId"
	, ng.name as "nodeGroupName"
	, t.id as "tagId"
	, t.name as "softwareTag"
	, t."signalTag" as "signalTag"
from "NodeModule" nm
	left join "Node" n on n.id = nm."nodeId"
	left join "Cabinet" c on n."cabinetId" = c.id
	left join "Channel" ch on n."channelId" = ch.id
	left join "Room" r on c."roomId" = r.id
	left join "NodeGroup" ng on n."nodeGroupId" = ng.id
	left join "Module" m on nm."moduleId" = m.id
	left join "Port" p on p."moduleId" = m.id
	left join "PortFeature" pf on pf."portId" = p.id
	left join "Feature" f on pf."featureId" = f.id
	left join "NodeFeatureValue" nfv on (nfv."portFeatureId" = pf.id and nfv."nodeModuleId" = nm.id)
	left join "Tag" t on t.id = nfv."tagId"
	left join "TagGroup" tg on t."groupId" = tg.id
where (
	pf.id is not null and f.id is not null
)
`

export const getAllNodesMonitoringFeaturesQuery = `
select
	CAST(COUNT(*) OVER () as INT) as "totalCount"
	, tg.name as "tagGroupName"
	, nm.id as "nodeModuleId"
	, n.id as "nodeId"
	, n."name" as "nodeName"
	, m.id as "moduleId"
	, m."name" as "moduleName"
	, p."name" as "portName"
	, p."order" as "portOrder"
	, r.id as "roomId"
	, r.name as "roomName"
	, c.id as "cabinetId"
	, c.name as "cabinetName"
	, ch.id as "channelId"
	, ch.name as "channelName"
	, ng.id as "nodeGroupId"
	, ng.name as "nodeGroupName"
	, t.id as "tagId"
	, t.name as "softwareTag"
	, t."signalTag" as "signalTag"
	, mf.id as "monitoringFeatureId"
	, mf.description as "monitoringFeatureDescription"
	, mf."name" as "monitoringFeatureName"
	, mf."registerCount" as "monitoringFeatureRegisterCount"
	, nm."aliasName" as "monitoringFeatureAliasName"
from "NodeModule" nm
	left join "Node" n on n.id = nm."nodeId"
	left join "Cabinet" c on n."cabinetId" = c.id
	left join "Channel" ch on n."channelId" = ch.id
	left join "Room" r on c."roomId" = r.id
	left join "NodeGroup" ng on n."nodeGroupId" = ng.id
	left join "Module" m on nm."moduleId" = m.id
	left join "Port" p on p."moduleId" = m.id
	left join "MonitoringFeature" mf on mf."portId" = p.id
	left join "NodeMonitoringFeature" nmf on (nmf."monitoringFeatureId" = mf.id and nmf."nodeModuleId" = nm.id)
	left join "Tag" t on t.id = nmf."tagId"
	left join "TagGroup" tg on t."groupId" = tg.id
where (
	mf.id is not null
)
`

export const getAllMonitoringFeaturesInfo = `
select
	n.id as "nodeId"
, n."name" as "nodeName"
, nm.id as "nodeModuleId"
, nm."aliasName" as "moduleAliasName"
, nm."moduleOrder" as "nodeModuleOrder"
, m."name" as "moduleName"
, p."order" as "portOrder"
, p."name" as "portName"
, p.id as "portId"
, mf."name" as "monitoringFeatureName"
, mf.description as "monitoringFeatureDescription"
, mf."order" as "monitoringFeatureOrder"
, mf.id as "monitoringFeatureId"
, t.id as "tagId"
, t.name as "tagName"
, t."signalTag" as "signalTag"
, nm."powerExponent" as "powerExponent"
, nm."linearConstant" as "linearConstant"
, nm."linearCoefficient" as "linearCoefficient"
from "NodeModule" nm
	inner join "Module" m on nm."moduleId" = m.id
	inner join "Node" n on nm."nodeId" = n.id
	inner join "Port" p on m.id = p."moduleId"
	inner join "MonitoringFeature" mf on p.id = mf."portId"
	inner join "NodeMonitoringFeature" nmf on (nmf."monitoringFeatureId" = mf.id and nmf."nodeModuleId" = nm.id)
	inner join "Tag" t on nmf."tagId" = t.id`

export const getAllMonitoringFeaturesByTagIds = `
select
	n.id as "nodeId"
, n."name" as "nodeName"
, nm.id as "nodeModuleId"
, nm."aliasName" as "moduleAliasName"
, nm."moduleOrder" as "nodeModuleOrder"
, m."name" as "moduleName"
, p."order" as "portOrder"
, p."name" as "portName"
, p.id as "portId"
, mf."name" as "monitoringFeatureName"
, mf.description as "monitoringFeatureDescription"
, mf."order" as "monitoringFeatureOrder"
, mf.id as "monitoringFeatureId"
, t.id as "tagId"
, t.name as "tagName"
, t."signalTag" as "signalTag"
, t."groupId" as "tagGroupId"
, nm."powerExponent" as "powerExponent"
, nm."linearConstant" as "linearConstant"
, nm."linearCoefficient" as "linearCoefficient"
from "NodeModule" nm
	inner join "Module" m on nm."moduleId" = m.id
	inner join "Node" n on nm."nodeId" = n.id
	inner join "Port" p on m.id = p."moduleId"
	inner join "MonitoringFeature" mf on p.id = mf."portId"
	inner join "NodeMonitoringFeature" nmf on (nmf."monitoringFeatureId" = mf.id and nmf."nodeModuleId" = nm.id)
	inner join "Tag" t on nmf."tagId" = t.id
where t.id in
`
