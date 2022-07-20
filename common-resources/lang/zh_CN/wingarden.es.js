export default {
    moduleName:"容器管理",
    login: {
        title: "登录",
        form: {
            account: "账号",
            password: "密码"
        },
        loginButton: "登录"
    },
    common: {
        create: '新建',
        import: '导入',
        delete: '删除',
        remove: '移除',
        pleaseInput: '请输入',
        pleaseSelect: '请选择',
        advancedSetting: '高级设置',
        otherInfo: '其他信息',
        cancel: '取消',
        prev: '上一步',
        next: '下一步',
        confirm: '确定',
        close:"关闭",
        add: '添加',
        copy: '复制',
        cpu: 'CPU',
        memory: '内存',
        storage: '存储',
        status: "状态",
        control: "操作",
        type:"类型",
        more: "更多",
        start: "启用",
        stop: "禁用",
        baseInfo: "基本信息",
        createTime: "创建时间",
        NoDescription:"暂无备注",
        statusList:{
            success:"成功",
            failed:"失败",
            running:"运行中",
            error:"错误",
            health:"健康",
            ok:"正常"
        },
        statistics: {
            totalCpu: "CPU总量",
            totalMemory: "内存总量",
            totalContainerGroup: "容器组总量",
            totalStorage: "本地存储总量",
            limitCpu:"CPU限制",
            limitMemory:"内存限制",
            limitPod:"容器组限制",
            limitStorage:"存储限制",
            requestCpu:"CPU预留",
            requestMemory:"内存预留",
            requestPod:"容器组预留",
            requestStorage:"存储预留",
            usedCPU:"CPU使用量",
            usedMemory:"内存使用量",
            usedStorage:"存储使用量",
            usedPod:"容器组使用量",
            podNum:"容器组数量",
            used: "已使用",
            unused: "未使用",
            allocated: "已分配",
            unallocated: "未分配",
            cpuUsedPercent:"CPU使用率",
            meoryUsedPercent:"内存使用率",
            podUsedPercent:"容器组用量",
            storageUsedPercent:"本地存储用量",
            CPURequest:"CPU请求",
            memoryRequest:"内存请求"
        },
        knowmore: "了解更多",
        unit:{
            one:"个"
        },
        isLodingData:"正在加载数据..."
    },
    valid: {
        required: "不能为空",
        pattern: "格式错误",
        startPortSmallerThanEndPort:"开始端口必须要比结束端口小",
        pleaseSelectDataFirst:"请先选择数据!",
        pleaseInputName:"请输入{name}名称",
        pleaseInput:"请输入{name}",
        tips1:"最长63个字符，且必须以字母或者数字开头及结尾"
    },
    message: {
        createSuccess: "新增成功！",
        deleteSuccess: "删除成功！",
        modifySuccess: "修改成功！",
        editSuccess: "编辑成功！",
        submitCreatequestSuccess: "提交创建请求成功!",
        submitDelrequestSuccess: "提交删除请求成功!",
        importSuccess: "导入{type}成功",
        updateSuccess:"升级成功!",
        pleaseInputInfo:"请填写必要信息!",
        controlSuccess:"操作成功",
        textCopied:"文本已复制",
        copyFailed:"文本复制失败，请手动尝试复制",
        emptyData:"暂无数据"
    },
    cluster: {
        cluster: '集群',
        clusterIntroduce:"对多集群以及每个集群的基础资源、应用资源等的统一管理。",
        clusterManager: "集群管理",
        importCluster: "导入集群",
        dashboard: '总览',
        dashboard2: '概览',
        nodeManager: '节点管理',
        baseInstallation: '基础设施',
        index: '首页',
        resourceTotal: '资源概览',
        clusterNum: '集群数量',
        nodeNum: '节点数量',
        namespace: "命名空间",
        namespaceNum: '命名空间数量',
        workerNum: '工作负载数量',
        containerGroupNum: '容器组数量',
        networkFlowMonitor: '网络流量监控',
        diagnose: '诊断',
        console: '控制台',
        editCluster: '编辑集群',
        update: '升级',
        registCommand: '注册命令',
        clusterName: '集群名称',
        clusterShowName: '集群显示名称',
        clusterInstanceName: '集群底层名称',
        Kubernets: "Kubernetes",
        kubernetsVersion: 'Kubernetes版本',
        containerRunning: '容器运行时',
        networkPlugin: '网络插件',
        nginxIngress: 'Nginx Ingress',
        nodePortRange: 'Node Port范围',
        DockerRootPath: 'Docker根目录',
        EtcdBackupStorage: 'Etcd备份存储',
        buildHostCommand: '生成添加主机命令',
        EtcdTips1: 'Etcd 备份只保存在本地，不执行外部存储',
        EtcdTips2: 'S3 将在本地生成备份，随后将备份拷贝到 S3 存储',
        clusterDescription: '集群描述',
        from: "来源",
        createCluster: "创建集群",
        stepReadyNode: "准备节点",
        stepClusterInfo: "集群信息",
        clusterPort: "集群端口",
        showCluster: "集群详情",
        clusterInfo: "集群信息",
        KubernetesPluginStatus: "Kubernetes 组件状态",
        kubernetesPluginInfo: {
            requestCount: "API每秒请求次数",
            requestDelay: "API 请求延迟",
            taskerCount: "调度器调度次数",
            faileContainerGroupCount: "调度失败的容器组"
        },
        clusterResourceUseInfo: "集群资源使用情况",
        clusterResourceAlocteInfo: "集群资源分配情况",
        tableHeaderTips: {
            nodeCount: "正常节点数/总节点数",
            cpuCapacityCount: "CPU已使用量/CPU总量",
            memoryCapacityCount: "内存已使用量/内存总量",
            storageCapacityCount: "存储已使用量/存储总量"
        },
        returnClusterManager: "返回集群管理",
        changeManager: "切换集群",
        controlTips:{
            confirmDelClusters:"确认删除{name}集群吗？",
            submitCreateClusterSuccess: "提交创建集群请求成功!",
            submitDelClusterSuccess:"提交删除{name}集群请求成功",
            delClustersTips:"集群来源为新建，删除集群，容器集群将被删除，节点服务器如果为自动创建的虚拟机，也将被删除集群来源为导入，删除集群，容器集群不再被纳管，且通过管理界面开启的相关服务将被关闭或删除。",
        },
        commandTips:"创建集群完成后，请在集群列表-操作列-注册命令查看添加主机命令",
        clickChangeCluster:"点击切换集群",
        editSuccess: "编辑集群{name}成功！"
    },
    node: {
        nodeIntroduce:"提供了对当前集群下节点的统一管理。",
        createNode: "新增节点",
        dashboard: '概览',
        addNode: "添加节点",
        editNode:"编辑节点",
        nodeName:"节点名称",
        nodeId:"节点ID",
        nodeDescription:"节点描述",
        nodeApply: '节点提供商',
        nodeNetwork: '节点网络',
        networkType: "网络类型",
        masterNode: 'Master节点',
        masterNodePort: "Master节点端口",
        masterNodeNum: 'Master节点数量',
        masterNodeAccount: '节点用户名',
        masterNodePassword: '节点密码',
        shareNodeWithWorker: '共用节点',
        isShare: '共用',
        noShare: '不共用',
        WorkerNodeNum: 'Worker节点数量',
        WorkerNodeConfig: 'Worker节点规格',
        MasterNodeConfig: 'Master节点规格',
        nodeInfo: '节点信息',
        MasterNodeInfo: 'Master节点信息',
        WorkerNodeInfo: 'Worker节点信息',
        winSphere: 'winSphere',
        vSphere: 'vSphere',
        other: '其他',
        vpcNetwork: 'VPC网络',
        vpc: 'VPC',
        privateNetwork: '私有网络',
        classicNetwork: '经典网络',
        ip: 'IP',
        port: '端口',
        account: '用户名',
        password: '密码',
        nodeIp:"节点IP",
        passworkInputTips1: '注：Master信息密码框中已输入的内容不支持被复制粘贴',
        passworkInputTips2: '注：Worker信息密码框中已输入的内容不支持被复制粘贴',
        vpcTips: "若未选中VPC，则会自动新建一个VPC",
        privateNetWorkTips: "若未选中私有网络，则会自动新建一个私有网络",
        role: '角色',
        nodeRole: '节点角色',
        nodeTips1: '每个节点可以运行多个角色。每个集群至少需要一个 Master 角色、一个 Worker 角色',
        copyAndRun: '复制以上命令在节点的 SSH 终端运行',
        canSchedule:"可调度",
        cannotSchedule:"不可调度",
        openSchedule:"启用调度",
        stopSchedule:"禁止调度",
        driveout:"驱逐",
        staintaintManage:"污点管理",
        scheduleStatus:"调度状态",
        nodeResourceUsed:"节点资源使用情况",
        nodeResourceAlocted:"节点资源分配情况",
        nodeHealthState:"节点健康状态",
        tipList:{
            editStaintaintSuccess: "编辑污点成功！",
            lessOneNode:"请至少添加一个Master节点或者Worker节点！",
            checkInput:"请检查并完善节点信息！",
            sureOpenSchedule:"确认要启用调度 {name} 节点吗？",
            openScheduleTips:"启用调度后，将节点调度状态标记为可调度。新建的容器组将可调度至该节点上。",
            sureStopSchedule:"确认要禁止调度 {name} 节点吗？",
            stopScheduleTips:"禁止调度后，将节点调度状态标记为不可调度。新建的容器组将不会调度至该节点上。但这不会影响该节点上现有工作负载。",
            sureDriveout:"确认要驱逐 {name} 节点吗？",
            sureDriveoutTips:"驱逐后，会删除本地数据而且删除节点。",
            sureDelete:"确认删除 {name} 节点?",
            sureDeleteTips:"删除节点，将会删除节点上的所有工作负载。 如果删除的节点是自动创建出来的虚拟机，则会将节点服务器一并删除；如果删除的节点不是自动创建出来的虚拟机，则不会将节点服务器一并删除。"
        },
        otherInfo:{
            osImage:"操作系统",
            kernelVersion:"内核版本",
            architecture:"系统架构",
            containerRuntimeVersion:"容器版本",
            kubeletVersion:"Kubelet 版本",
            kubeProxyVersion:"Kube-Proxy 版本"
        },
        nodeHealthStateList:{
            NetworkUnavailable:{
                title:"网络配置(NetworkUnavailable)",
                tips:"检查节点上的网络配置是否正确"
            },
            MemoryPressure:{
                title:"内存压力(MemoryPressure)",
                tips:"节点健康且可以接收新的容器组"
            },
            DiskPressure:{
                title:"磁盘压力(DiskPressure)",
                tips:"磁盘大小存在压力，即磁盘容量低"
            },
            PIDPressure:{
                title:"进程压力(PIDPressure)",
                tips:"如果节点进程压力过大，则会调度失败"
            },
            Ready:{
                title:"容器组接收(Ready)",
                tips:"如果节点上的内存使用压力过大，则会调度失败"
            }
        },
        staintaintList:{
            NoSchedule:"不允许调度(NoSchedule)",
            PreferNoSchedule:"尽量不调度(PreferNoSchedule)",
            NoExecute:"不允许并驱逐已有容器组(NoExecute)",
        }
    },
    label: {
        label: "标签",
        key: "键",
        value: "值",
        strategy: "策略",
        editLabel: "编辑标签",
        systemNecessary:"系统预留字段，不允许输入"
    },
    namespace: {
        namespace: "命名空间",
        namespaceName:"命名空间名称",
        namespaceManger: "命名空间管理",
        user:"用户",
        system:"系统"
    },
    workLoad: {
        workLoad: "工作负载",
        workLoadName:"工作负载名称",
        appLoad: "应用负载"
    },
    Task: {
        Task: "任务"
    },
    containerGroup: {
        containerGroup: "容器组",
        containerGroupName: "容器组名称",
        containerGroupIp: "容器组IP",
        restartNmu:"重启次数"
    },
    service: {
        service: "服务",
        serviceName:"服务名称",
        creator:"创建人",
        description:"描述"
    },
    appRoute: {
        appRoute: "应用路由",
        name:"名称",
        creator:"路由创建人",
        description:"路由描述"
    },
    ssh: {
        ssh: "密钥",
        sshName: "名称",
        configNum: "配置项数量"
    },
    config: {
        config: "配置",
        configCenter: "配置中心",
        configName:"配置名称",
        configCount:"配置项数量"
    },
    serviceAccount: {
        serviceAccount: "服务账户",
        serviceAccountName: "服务账户"
    },
    volume: {
        volume: "存储卷",
        volumeName: "存储名称",
        volumeManager: "存储管理",
        status:{
            available:"可用",
            bound:"已绑定",
            released:"已释放",
            failed:"失败"
        },
        visitMode:"访问模式"
    },
    volumeSnapshot: {
        volumeSnapshot: "存储卷快照"
    },
    volumeType: {
        volumeType: "存储类型",
        volumeTypeName:"名称",
        volumeTypeNum:"存储卷数量",
        provisioner:"供应者"
    },
    monitor:{
        monitor:"监控"
    },
    event:{
        event:"事件"
    }

};