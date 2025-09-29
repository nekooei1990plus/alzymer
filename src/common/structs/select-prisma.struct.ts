import type { Prisma } from "@prisma/client"

export const fullUserFieldSelect = {
	id: true,
	role: true,
	username: true,
	description: true,
	name: true,
	canDiagnosis: true,
	active: true,
	isEngineer: true,
} satisfies Prisma.UserSelect

export const defaultFCodeSelect = {
	color: true,
	encodingNumber: true,
	englishError: true,
	id: true,
	moduleId: true,
	persianError: true,
} satisfies Prisma.FCodeSelect

export const defaultGroupFieldSelect = {
	id: true,
	name: true,
	color: true,
} satisfies Prisma.NodeGroupSelect

export const defaultRoomFieldSelect = {
	id: true,
	name: true,
	description: true,
} satisfies Prisma.RoomSelect

export const defaultRoomDetailsFieldSelect = {
	id: true,
	description: true,
	name: true,
	cabinets: {
		orderBy: { createdDate: "asc" },
		select: {
			id: true,
			name: true,
			description: true,
			nodes: {
				orderBy: { createdDate: "asc" },
				select: {
					id: true,
					name: true,
					ip: true,
					secondaryIp: true,
					description: true,
					channel: {
						select: {
							id: true,
							name: true,
							description: true,
						},
					},
					group: {
						select: {
							color: true,
						},
					},
					propertyGroups: {
						select: {
							features: {
								select: {
									englishName: true,
									persianName: true,
									value: true,
								},
								where: {
									showOnHover: true,
								},
							},
						},
					},
				},
			},
		},
	},
} satisfies Prisma.RoomSelect

export const defaultCabinetFieldSelect = {
	id: true,
	name: true,
	description: true,
	roomId: true,
} satisfies Prisma.CabinetSelect

export const defaultChannelFieldSelect = {
	id: true,
	name: true,
	description: true,
} satisfies Prisma.ChannelSelect

export const defaultForcedMonitoringFeatureSelect = {
	monitoringFeatureId: true,
	nodeModuleId: true,
	ioValue: true,
	forceStatus: true,
	forceValue: true,
	logicValue: true,
	monitoringFeature: {
		select: {
			order: true,
			name: true,
			description: true,
			registerCount: true,
			port: {
				select: {
					id: true,
					order: true,
					name: true,
				},
			},
		},
	},
	nodeModule: {
		select: {
			id: true,
			aliasName: true,
			module: {
				select: {
					name: true,
				},
			},
			node: {
				select: {
					name: true,
				},
			},
		},
	},
	tag: {
		select: {
			name: true,
			id: true,
			groupId: true,
			signalTag: true,
		},
	},
} satisfies Prisma.NodeMonitoringFeatureSelect

export const defaultForcedMonitoringFeatureInclude = {
	monitoringFeature: {
		select: {
			name: true,
			description: true,
		},
	},
	tag: {
		select: {
			name: true,
			id: true,
			signalTag: true,
		},
	},
} satisfies Prisma.NodeMonitoringFeatureInclude

export const defaultNodeFieldSelect = {
	id: true,
	name: true,
	description: true,
	includeAppFunctions: true,
	nodeGroupId: true,
	group: {
		select: { name: true },
	},
	channelId: true,
	channel: {
		select: { name: true },
	},
	cabinetId: true,
	cabinet: {
		select: { name: true, roomId: true, room: { select: { name: true } } },
	},
	ip: true,
	secondaryIp: true,
	exportIsNeeded: true,
} satisfies Prisma.NodeSelect

export const defaultModuleTypeFieldSelect = {
	id: true,
	name: true,
	description: true,
	isMemoryType: true,
	operations: true,
} satisfies Prisma.ModuleTypeSelect

export const defaultModuleFieldSelect = {
	id: true,
	name: true,
	description: true,
	fCodes: true,
	moduleType: true,
} satisfies Prisma.ModuleSelect

export const defaultUnitFieldSelect = {
	id: true,
	name: true,
	encodingNumber: true,
	unitGroup: true,
	unitGroupId: true,
} satisfies Prisma.UnitSelect

export const defaultTagFieldSelect = {
	id: true,
	name: true,
	groupId: true,
	signalTag: true,
} satisfies Prisma.TagSelect

export const defaultTagGroupFieldSelect = {
	id: true,
	name: true,
	type: true,
	aliasName: true,
} satisfies Prisma.TagGroupSelect

export const defaultFeatureFieldSelect = {
	id: true,
	name: true,
	isTime: true,
	isSigned: true,
	isBigEndian: true,
	powerExponent: true,
	linearCoefficient: true,
	linearConstant: true,
	description: true,
	manualRegisterCount: true,
	type: true,
	valueType: true,
	isIp: true,
	isTotalVolume: true,
	isFreeVolume: true,
	isGroupRegister: true,
	unitGroups: {
		select: {
			id: true,
			name: true,
			units: true,
		},
	},
	valueOptions: {
		select: {
			id: true,
			name: true,
			encodingNumber: true,
		},
		orderBy: {
			order: "asc",
		},
	},
} satisfies Prisma.FeatureSelect

export const defaultPortFieldSelect = {
	id: true,
	name: true,
	order: true,
	module: {
		select: {
			id: true,
			name: true,
			moduleType: {
				select: {
					id: true,
					name: true,
					isMemoryType: true,
					operations: true,
				},
			},
		},
	},
} satisfies Prisma.PortSelect

export const defaultNodeModuleSimpleFieldSelect = {
	id: true,
	nodeId: true,
	moduleId: true,
	moduleOrder: true,
	aliasName: true,
	module: {
		select: {
			name: true,
		},
	},
} satisfies Prisma.NodeModuleSelect

export const defaultMonitoringFeatureFieldSelect = {
	id: true,
	description: true,
	name: true,
	order: true,
	registerCount: true,
	portId: true,
} satisfies Prisma.MonitoringFeatureSelect

export const defaultPortFeatureFieldSelect = {
	id: true,
	order: true,
	portId: true,
	feature: {
		select: {
			...defaultFeatureFieldSelect,
		},
	},
} satisfies Prisma.PortFeatureSelect

export const moduleDetailsFieldSelect = {
	...defaultModuleFieldSelect,
	ports: {
		orderBy: {
			order: "asc",
		},
		select: {
			id: true,
			name: true,
			order: true,
			monitoringFeatures: {
				orderBy: {
					order: "asc",
				},
				select: {
					id: true,
					description: true,
					name: true,
					order: true,
					registerCount: true,
				},
			},
			portFeatures: {
				orderBy: {
					order: "asc",
				},
				select: {
					id: true,
					order: true,
					feature: {
						select: {
							...defaultFeatureFieldSelect,
						},
					},
				},
			},
		},
	},
} satisfies Prisma.ModuleSelect

export const nodeDetailsFieldSelect = {
	id: true,
	name: true,
	description: true,
	ip: true,
	secondaryIp: true,
	exportIsNeeded: true,
	modules: {
		select: {
			id: true,
			moduleOrder: true,
			aliasName: true,
			module: {
				select: {
					id: true,
					name: true,
					description: true,
				},
			},
		},
	},
} satisfies Prisma.NodeSelect

export const defaultNodePropertyGroupFieldSelect = {
	id: true,
	name: true,
	nodeId: true,
} satisfies Prisma.NodePropertyGroupSelect

export const defaultNodePropertyFieldSelect = {
	id: true,
	propertyGroupId: true,
	persianName: true,
	englishName: true,
	showOnHover: true,
	value: true,
} satisfies Prisma.NodePropertyFeatureSelect

export const fullPortFieldSelect = {
	id: true,
	order: true,
	name: true,
	portFeatures: {
		select: {
			id: true,
			order: true,
			feature: {
				select: {
					...defaultFeatureFieldSelect,
				},
			},
			featureValues: {
				select: {
					tag: {
						select: defaultTagFieldSelect,
					},
				},
			},
		},
		orderBy: {
			order: "asc",
		},
	},
	monitoringFeatures: {
		select: {
			id: true,
			order: true,
			registerCount: true,
			name: true,
			nodeMonitoringFeature: {
				select: {
					tag: {
						select: {
							name: true,
							signalTag: true,
						},
					},
				},
			},
		},
		orderBy: {
			order: "asc",
		},
	},
} satisfies Prisma.PortSelect

export const defaultFullNodeModuleFieldSelect = {
	moduleOrder: true,
	nodeId: true,
	aliasName: true,
	module: {
		select: {
			name: true,
			moduleType: {
				select: {
					isMemoryType: true,
					name: true,
				},
			},
			ports: {
				select: {
					...fullPortFieldSelect,
				},
				orderBy: {
					order: "asc",
				},
			},
			fCodes: {
				select: {
					englishError: true,
					persianError: true,
					encodingNumber: true,
					color: true,
				},
			},
		},
	},
} satisfies Prisma.NodeModuleSelect

export const defaultNodeLedFieldSelect = {
	id: true,
	nodeId: true,
	maxBitCount: true,
	name: true,
	onColor: true,
	order: true,
	ledNames: true,
} satisfies Prisma.NodeLEDGroupSelect

export const defaultNodeFaultFieldSelect = {
	id: true,
	englishError: true,
	persianError: true,
	color: true,
	encodingNumber: true,
} satisfies Prisma.NodeFaultCodeSelect

export const defaultModuleFaultFieldSelect = {
	id: true,
	englishError: true,
	persianError: true,
	color: true,
	encodingNumber: true,
} satisfies Prisma.ModuleFaultCodeSelect

export const defaultUserLogFieldSelect = {
	createdDate: true,
	itMessage: true,
	id: true,
	message: true,
	user: {
		select: fullUserFieldSelect,
	},
} satisfies Prisma.UserLogSelect

export const defaultGlobalConfigFieldSelect = {
	encryptionEnabled: true,
	logoutExpirationTime: true,
	registerByteCount: true,
	autoBackupPeriod: true,
	modbusServerPort: true,
	intervalTimeToSendPacketsInSeconds: true,
} satisfies Prisma.GlobalConfigSelect

export const defaultNodeFeatureValueFieldSelect = {
	nodeModule: {
		select: {
			id: true,
			moduleOrder: true,
			module: {
				select: {
					id: true,
					name: true,
				},
			},
			node: {
				select: {
					id: true,
					name: true,
					cabinet: {
						select: {
							id: true,
							name: true,
							room: {
								select: {
									id: true,
									name: true,
								},
							},
						},
					},
					channel: {
						select: {
							id: true,
							name: true,
						},
					},
					group: {
						select: {
							id: true,
							name: true,
						},
					},

				},
			},
		},
	},
	portFeature: {
		select: {
			feature: {
				select: {
					id: true,
					name: true,
				},
			},
			featureValues: {
				select: {
					tag: {
						select: {
							id: true,
							name: true,
							signalTag: true,
						},
					},
				},
			},
		},
	},
} satisfies Prisma.NodeFeatureValueSelect

export const defaultNodeModuleFieldSelect = {
	id: true,
	moduleOrder: true,
	linearCoefficient: true,
	linearConstant: true,
	powerExponent: true,
	nodeId: true,
	node: { select: defaultNodeFieldSelect },
	module: { select: defaultModuleFieldSelect },
	moduleId: true,
	aliasName: true,
} satisfies Prisma.NodeModuleSelect

export const defaultNodeStorageFieldSelect = {
	id: true,
	name: true,
	modules: {
		select: {
			id: true,
			aliasName: true,
			moduleOrder: true,
			module: {
				select: {
					name: true,
					ports: {
						select: {
							id: true,
							order: true,
							portFeatures: {
								select: {
									id: true,
									order: true,
									feature: {
										select: {
											unitGroups: { select: { units: { select: { encodingNumber: true, name: true } } } },
											isTotalVolume: true,
											isFreeVolume: true,
										},
									},
								},
								orderBy: {
									order: "asc",
								},
							},
						},
						orderBy: {
							order: "asc",
						},
					},
				},
			},
		},
		orderBy: {
			moduleOrder: "asc",
		},
	},
} satisfies Prisma.NodeSelect
