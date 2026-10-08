const services = {
  datastream:{
    name:"Datastream", category:"接入 · 数据库变更", icon:"DS", old:"", business:"持续捕获生产系统的增删改，让分析与运营使用接近实时的数据。", summary:"面向数据库和业务应用的无服务器 CDC 与复制服务：它读取变更事件，而不是反复做全量导出。", fit:"订单、库存、客户资料等业务库不断变化；希望减少全表抽取和源库负担，并缩短数据到达下游的时间。", notFit:"需要搬迁海量文件或对象时，应考虑 Storage Transfer Service；复杂变更后的实时计算则交给 Dataflow。", tech:"官方将其定义为无服务器 CDC 和复制服务。支持 Oracle、MySQL、SQL Server、PostgreSQL、MongoDB、Spanner、Salesforce 等来源，并可将变更流写入 Cloud Storage；通过 Dataflow 模板可继续加载到更多目标。", price:"按官方 Datastream 定价页的 SKU 与实际用量计费；源端、目标端及关联的其他 Google Cloud 服务可能另行计费。", docs:"https://cloud.google.com/datastream/docs", pricing:"https://cloud.google.com/datastream/pricing"},
  transfer:{
    name:"Storage Transfer Service", category:"接入 · 文件与对象", icon:"ST", business:"把散落在本地、其他云和对象存储中的历史数据，可靠地带入云上数据链路。", summary:"用于对象与文件存储系统之间的数据迁移、复制和定时同步，尤其适合大规模数据集。", fit:"迁移数据中心文件、汇聚 AWS/Azure 对象数据、将 HDFS 数据入湖，或为备份和容灾做增量同步。", notFit:"它不是行级 CDC；需要同步业务库的事务变化时选 Datastream。", tech:"支持 Amazon S3、Azure Blob、Cloud Storage、HDFS、本地文件系统和公开 URL 等路径；可使用 Google 托管传输或自托管代理。官方文档说明其针对超过 1 TiB 的传输进行了优化。", price:"官方产品页的定价部分按传输模式说明收费；还可能产生目标存储、网络或源云提供商费用。", docs:"https://cloud.google.com/storage-transfer/docs/overview", pricing:"https://cloud.google.com/storage-transfer-service#pricing"},
  pubsub:{
    name:"Pub/Sub", category:"接入 · 事件消息", icon:"PS", business:"让应用、设备和系统发布业务事件，而下游团队可以各自独立地实时消费。", summary:"可扩展的异步消息服务，解耦消息生产者与处理者。", fit:"点击流、IoT 遥测、支付完成、物流状态、服务日志等高并发事件；一个事件需要分发给多个独立团队或系统。", notFit:"既有 Kafka 应用且跨云可移植性最重要时，评估 Managed Service for Apache Kafka；Pub/Sub 本身不承担复杂流计算。", tech:"以 topic、publisher 和 subscription 为核心。官方说明其典型延迟量级约 100 毫秒，可用于流式分析与数据集成；可与 Dataflow 集成处理后输出。", price:"按官方 Pub/Sub 定价页列出的消息吞吐、存储和网络等实际用量计费，免费额度及区域规则以该页为准。", docs:"https://cloud.google.com/pubsub/docs/overview", pricing:"https://cloud.google.com/pubsub/pricing"},
  kafka:{
    name:"Managed Service for Apache Kafka", category:"接入 · Kafka 消息流", icon:"K", business:"保留 Kafka 的开发与数据集成方式，同时把集群运维交给 Google Cloud。", summary:"托管开源 Apache Kafka 集群，帮助完成安全、扩缩容、存储管理和基础设施维护。", fit:"已有 Kafka 生产者/消费者，迁云时希望少改代码；或多云/本地都需要一致的 Kafka 体验、分区有序和事件日志模式。", notFit:"如果更看重无服务器、独立发布/订阅扩缩容与最少运维，官方建议优先评估 Pub/Sub。", tech:"兼容开源 Kafka，提供三可用区的区域集群、分层存储、Kafka Connect 集成和 Schema Registry（部分能力处于 Preview，须在上线前核查发布阶段）。容量按 vCPU 和内存配置，服务会据此配置 broker。", price:"按集群的已配置与已使用资源计费，包括计算、内存、持久化存储、数据传输及相关组件；请以官方价格页及区域 SKU 为准。", docs:"https://cloud.google.com/managed-service-for-apache-kafka/docs/overview", pricing:"https://cloud.google.com/managed-service-for-apache-kafka/pricing"},
  dataflow:{
    name:"Dataflow", category:"处理 · 批处理与流处理", icon:"DF", business:"把实时或批量原始数据自动并行加工为指标、明细和可供下游消费的数据。", summary:"统一的批处理和流处理服务，适合大规模 ETL、实时分析及复杂数据转换。", fit:"实时反欺诈、日志与传感器处理、事件聚合、流式 ETL、跨源关联、实时 ML 特征准备等需弹性并行计算的场景。", notFit:"若主要诉求是低代码连接器和拖拽集成，先看 Cloud Data Fusion；已有大量 Spark/Hadoop 作业时，Managed Service for Apache Spark 可能迁移成本更低。", tech:"基于 Apache Beam；可用 Java、Python、Go SDK 编程，也可使用 Google 模板或 Job Builder。官方说明支持批流统一模型、自动扩缩容，流式管道默认提供 exactly-once 处理。", price:"按 Dataflow 定价页所列资源和处理能力计费；流式/批处理、区域及所用功能会影响实际成本。Dataflow Prime 是 Dataflow 的执行能力，不是独立产品。", docs:"https://cloud.google.com/dataflow/docs/overview", pricing:"https://cloud.google.com/dataflow/pricing"},
  spark:{
    name:"Managed Service for Apache Spark", category:"处理 · Spark/Hadoop", icon:"SP", old:"原 Dataproc", business:"让已有 Spark/Hadoop 团队以更少的集群管理工作运行 ETL、SQL、流处理和机器学习作业。", summary:"Google Cloud 已将 Dataproc 与 Serverless for Apache Spark 统一到该产品名下；可选择无服务器作业或托管集群。", fit:"已有 PySpark、Spark SQL、Hive 或 Hadoop 资产；需要迁移既有大数据作业，使用开源生态，或希望在受控集群中获得更多定制能力。", notFit:"纯新的、事件驱动的流式管道并非一定要 Spark；需要 Apache Beam 的统一批流语义和托管流处理时，可先评估 Dataflow。", tech:"无服务器模式是按作业运行的 Spark；集群模式提供托管的 Spark 集群与更细的基础设施控制。官方还明确保留 Spark/Hadoop/Hive/Pig 等生态支持。", price:"无服务器模式按作业运行时间和所用资源计费；集群模式按底层计算资源与管理费用计费。精确规格及地区价格以官方价格页为准。", docs:"https://cloud.google.com/products/managed-service-for-apache-spark", pricing:"https://cloud.google.com/products/managed-service-for-apache-spark/pricing"},
  fusion:{
    name:"Cloud Data Fusion", category:"处理 · 低代码集成", icon:"CF", business:"用可视化方式把许多来源、转换与目标快速连成可运营的数据管道。", summary:"基于 CDAP 的托管企业数据集成服务，支持构建、运行和管理批处理及实时管道。", fit:"连接器多、来源异构、希望业务技术人员和工程团队共同维护接入流程，或需要更快交付标准 ETL 的团队。", notFit:"需要高度定制的大规模流处理或复杂窗口/状态逻辑时，Dataflow 的代码化模型通常更合适。", tech:"Studio 用 DAG 连接 source、transform、sink 等插件；可预览样本、版本化、定时和触发。执行时可创建临时 Managed Service for Apache Spark 环境，或使用受控的现有集群。", price:"官方将价格分为实例开发时间与管道执行两部分；执行所用的 Managed Service for Apache Spark 以及存储、网络等资源会另行计费。", docs:"https://cloud.google.com/data-fusion/docs/concepts/overview", pricing:"https://cloud.google.com/data-fusion/pricing"},
  airflow:{
    name:"Managed Service for Apache Airflow", category:"运营 · 工作流编排", icon:"AF", old:"原 Cloud Composer", business:"把每日、每小时或按依赖触发的数据任务编排成可监控、可重试、可审计的交付流程。", summary:"原 Cloud Composer，现为基于 Apache Airflow 的托管工作流编排服务。", fit:"需要按依赖依次触发数据提取、Dataflow/Spark 作业、质量检查和发布；或流程跨本地、多云和 Google Cloud 服务。", notFit:"它负责协调任务而不是执行大规模转换。低延迟的 HTTP 微服务编排更接近 Workflows 的设计目标。", tech:"工作流以 Python DAG 定义；Apache Airflow 的调度、依赖解析、operators 和 sensors 用于调用各类服务。官方明确将它定位于尤其是 ETL/ELT 的数据驱动工作流。", price:"按官方价格页中环境基础设施、调度器、worker、数据库、存储和网络等相关资源计费；环境规格和使用模式影响成本。", docs:"https://cloud.google.com/composer/docs/composer-3/composer-overview", pricing:"https://cloud.google.com/composer/pricing"},
  dataform:{
    name:"Dataform", category:"运营 · SQL 转换开发", icon:"DA", business:"把散落的 SQL 转换变成可评审、可测试、可追溯、可定时发布的数据产品代码。", summary:"面向 BigQuery 的 ELT 转换开发与工作流服务，管理 SQL 依赖、版本、测试和文档。", fit:"原始数据已到 BigQuery，团队要构建客户、订单、收入等可信主题表，并希望像管理软件一样管理 SQL 变更。", notFit:"它不是通用 ETL 引擎，不负责从外部系统采集数据，也不是独立数仓；运行目标是 BigQuery。", tech:"Dataform 使用 SQLX/SQL 与 JavaScript；能编译依赖图、管理 Git、运行 assertions（数据断言）、生成文档并调度工作流。官方说明 Dataform 服务本身免费，但会产生 BigQuery 查询与 Cloud Logging 等关联费用。", price:"Dataform 服务免费；不过在 BigQuery 执行的查询、Cloud Logging 以及可能使用的 Composer、Scheduler 或 Workflows 会按各自服务价格计费。", docs:"https://cloud.google.com/dataform/docs/overview", pricing:"https://cloud.google.com/dataform/pricing"},
  catalog:{
    name:"Knowledge Catalog", category:"治理 · 元数据与质量", icon:"KC", old:"原 Dataplex Universal Catalog", business:"让团队和 AI 找到正确数据、理解业务口径、发现血缘，并在数据失准时看到问题。", summary:"Dataplex Universal Catalog 已更名为 Knowledge Catalog；它汇聚数据资产的业务上下文和治理信息。", fit:"多个团队共享数据、指标定义频繁被追问、需要数据发现/血缘/质量规则，或希望让 AI 使用有依据的企业数据语境。", notFit:"它不替代数据仓、对象存储或计算引擎；它治理和描述资产，而非承载业务数据。", tech:"自动发现与索引技术结构、业务上下文、质量指标和关系；核心能力包括检索、术语表、血缘、数据剖析与质量扫描。现有 Dataplex API、client libraries 和 gcloud dataplex 命令保持可用。", price:"官方价格页说明仍使用 Dataplex SKU 名称，按处理与元数据存储等用量计费；血缘、质量、剖析及所依赖的其他服务可能带来额外费用。", docs:"https://cloud.google.com/dataplex/docs/introduction", pricing:"https://cloud.google.com/products/knowledge-catalog/pricing"},
  metastore:{
    name:"Dataproc Metastore", category:"治理 · 湖仓技术元数据", icon:"HM", business:"让多个 Spark、Hive 或 Presto 工作负载使用一致的表、分区和 schema 定义。", summary:"托管 Apache Hive Metastore，为数据湖保存可供开源计算引擎共享的技术元数据。", fit:"临时 Spark 集群或多个开源查询引擎都要访问同一数据湖，希望统一表定义、分区与统计信息。", notFit:"如果主要问题是业务口径、资产发现、数据质量和血缘，应看 Knowledge Catalog；Metastore 更偏执行引擎所需的技术元数据。", tech:"兼容 Hive Metastore，管理 schema、partitions 和 column statistics；官方说明服务高可用、自动修复、无服务器，并能连接 Spark、Hive、Presto 等工具。", price:"按所选服务版本、规格与区域的官方价格页计费；请结合实际元数据规模和高可用需求评估。", docs:"https://cloud.google.com/dataproc-metastore/docs/overview", pricing:"https://cloud.google.com/dataproc-metastore/pricing"}
};

const scenarios={
  realtime:{title:"让运营看见实时变化",text:"从业务事件或数据库变化开始，先可靠接入，再按业务规则实时加工。",ids:["pubsub","datastream","dataflow"]},
  migration:{title:"把历史数据带到云上",text:"文件、对象和大规模存量数据的迁移与同步，适合先建立可分析的数据底座。",ids:["transfer","fusion","spark"]},
  reliable:{title:"让每日交付不靠人工",text:"把跨团队、跨服务的依赖写成可监控工作流，并将 SQL 转换纳入版本与测试。",ids:["airflow","dataform","fusion"]},
  trust:{title:"让指标经得起追问",text:"不只让管道成功运行，也明确资产来源、定义、质量与责任边界。",ids:["catalog","metastore","dataform"]}
};

const catalog=document.querySelector('#catalog-grid');
catalog.innerHTML=Object.entries(services).map(([id,s])=>`<article class="product-card"><div><span class="category">${s.category}</span><h3>${s.name}${s.old?` <small>· ${s.old}</small>`:""}</h3><p>${s.business}</p></div><button data-service="${id}">查看详情</button></article>`).join('');

function renderScenario(key){const s=scenarios[key];document.querySelector('#scenario-panel').innerHTML=`<div><h3>${s.title}</h3><p>${s.text}</p></div><div class="mini-services">${s.ids.map(id=>`<button data-service="${id}">${services[id].name}</button>`).join('')}</div>`;}
renderScenario('realtime');

const dialog=document.querySelector('#detail-dialog');
const detail=document.querySelector('#detail-content');
function openService(id, updateUrl=true){const s=services[id]; if(!s) return; document.title=`${s.name}｜GCP 数据工程服务导览`; detail.innerHTML=`
  <div class="detail-top"><div class="detail-icon">${s.icon}</div><div><span class="category">${s.category}</span><h2 id="detail-title">${s.name}${s.old?` <small>· ${s.old}</small>`:""}</h2><p>${s.business}</p></div></div>
  <p class="detail-summary">${s.summary}</p>
  <div class="detail-grid"><section class="detail-box highlight"><h3>何时值得选</h3><p>${s.fit}</p></section><section class="detail-box"><h3>不应把它当成</h3><p>${s.notFit}</p></section></div>
  <section class="tech-section"><h3>技术定位与能力</h3><p>${s.tech}</p></section>
  <div class="detail-grid"><section class="detail-box"><h3>价格信息怎么读</h3><p>${s.price}</p></section><section class="detail-box"><h3>销售沟通提示</h3><p>价格会随区域、用量、部署选项和依赖服务而变化；本页不展示容易过期的固定金额，请通过官方价格页和价格计算器核算。</p></section></div>
  <div class="official-links"><a href="${s.docs}" target="_blank" rel="noopener">官方文档 ↗</a><a class="secondary" href="${s.pricing}" target="_blank" rel="noopener">官方定价 ↗</a></div><p class="source-note">来源：Google Cloud 官方产品与文档页面。详情文字仅概述页面所述能力；涉及可用性、发布阶段与价格，请以链接中的官方实时信息为准。</p>`;
  if(!dialog.open) dialog.showModal(); if(updateUrl) history.replaceState(null,'',`?service=${id}`);
}
function closeService(){dialog.close();document.title='GCP 数据工程服务导览';history.replaceState(null,'',location.pathname);}
document.addEventListener('click',e=>{const trigger=e.target.closest('[data-service]'); if(trigger) openService(trigger.dataset.service);});
document.querySelector('.dialog-close').addEventListener('click',closeService);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeService();});
document.querySelectorAll('[data-scenario]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-selected',String(b===btn)));renderScenario(btn.dataset.scenario)}));
const selected=new URLSearchParams(location.search).get('service');if(selected) openService(selected,false);
