/*
 Navicat Premium Data Transfer

 Source Server         : myconnect
 Source Server Type    : MySQL
 Source Server Version : 50638
 Source Host           : localhost:8889
 Source Schema         : mymovie

 Target Server Type    : MySQL
 Target Server Version : 50638
 File Encoding         : 65001

 Date: 10/05/2018 19:58:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(45) COLLATE utf8_bin NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `type` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '1',
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of account
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES (1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '包包大人', '0');
INSERT INTO `account` VALUES (2, 'test1', 'e10adc3949ba59abbe56e057f20f883e', '测试一', '1');
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `movie_id` int(11) NOT NULL,
  `user_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `user_score` decimal(2,1) NOT NULL,
  `comment` text COLLATE utf8_bin NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `agree` int(11) NOT NULL DEFAULT '0',
  `disagree` int(11) NOT NULL DEFAULT '0',
  KEY `FK_id` (`movie_id`),
  KEY `FK_name` (`user_name`),
  CONSTRAINT `FK_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_name` FOREIGN KEY (`user_name`) REFERENCES `account` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (1297192, '测试一', 5.0, '这部电影实在太经典了，一个无用镜头都没有，且悬疑精彩，所有情节都有伏笔，所有伏笔都有深义，整体逻辑毫无BUG，一改绝大多数悬疑电影爱故弄玄虚，过程忽悠结尾大转折，往回思考全是漏洞的缺点。\n\n首先，影片的开头就交代了两条主线进行叙述：一个是将要被行刑的犯人却因可能凡有精神病而要举行听证会。其中的细节交代凶手犯了连环凶杀案和凶手的母亲是个妓女。第二个就是11人被困motel的连环凶杀，亦影片主体部分。\n在Motel这部分的叙述中，出场人物包括：\n1.冒充旅店老板的小人物larry（有镜头交代他匆忙的把真正旅店老板的照片藏进抽屉里），他一方面贪财（盯着女明星的钱包看并在女明星死后偷走），另一方面却不好色，最直接的表达着对妓女的厌恶（作为一名男性，对比假警察的直接勾引和lou透过门缝观察paris的态度，很是奇怪）\n2.一家三口：懦弱的继父（出了事就很罗嗦），不爱说话只抱着玩具的孩子，有点强势的母亲。\n3.过气却仍颐指气使的女明星。\n4.具有正义感责任心等等一切有点的帅哥司机（前警察）\n5.骗钱的妓女，并打算开邪归正。实际上除开头骗老头钱的镜头外，没有任何显示她是个妓女的镜头，甚至还拒绝了假警察的调情。\n6.吵架的新婚小夫妻。男孩认为结婚是一时冲动，性格暴躁而女孩很焦虑并且欺骗他假怀孕。\n7.假警察与连环杀人犯。关于假警察的身份有多次提示：在穿衣服时背后的血印就暗示了大家，这衣服应该是别人的；在追杀人犯时他用名字而不是姓称呼对方；发现女明星的头时他直接想用手去拿被曾经是警察的司机阻止。连环杀人犯，此人最开始提示大家在motel情节的不合理之处：他明明逃跑到荒野，回头窗外却仍然是motel；他被绑起来之后忽然问假老板冰箱里装的是什么（作为一名逃犯，他理应是不可能发现冰箱里的尸体的，而且那个冰箱是在他视线所不及的里屋）\n\n然后故事开始推进，人物一个个在悬疑中死去。\n同时不断有镜头提示，情节的第一条线审判也在继续中，辩护方提出日记来证明嫌疑犯的多重人格。\n不禁引起观众好奇，这两条线索什么时候能够相遇，究竟相互之间有什么联系（片头的照片可以看出，此次审判的受害者并不在motel中，而且那个胖子犯人也不再motel中）。\n\n而仔细注意在Motel的凶杀案，开始越来越多不可解释的疑点，将案情指向不可能犯罪：\n1.前面提到的连环杀人犯的2处\n2.Lou的死：在lou被杀时，ginny只与他有一墙之隔，却没有听到任何任何打斗的声音\n3.最明显的：小孩父亲在一串复杂事件的作用下死亡却仍然拥有编号7的钥匙，这是杀人案中最难计划并实施的部分。\n4.爆炸的车中没有找到尸体。很不可思议吧，即使观众没看到过车辆爆炸现场也多半看过侦探片，没有尸体甚至没有骨灰太不寻常。\n5.之前死去的6具尸体全部消失，甚至连洗衣机内筒，棒球棒，床铺这种地方都变得十分干净，没有痕迹。如果真的存在凶手，会在移尸之后做那么多复杂的清洁工作么？\n6.Ed找到这些人之间的关联，竟然是生日都在5月10号（之前有金牛座的小伏笔）；并且每个人的名字都是美国地名。\n到这里还有相信是真的存在现实中的杀手么？什么样的杀手能这么凑巧的找到这些人并把它们困在雨夜的motel并用种种不可能的手法杀害大家么？\n\n此时，司机Ed的脑海中忽然响起了那首胖犯人自己编的诗，两条线索以奇妙又合理的结合起来了，原来大家都是胖犯人脑海中分裂出的人格，并因药物治疗而在一个个合并消失中——这不是谋杀案而是人格的自我治疗，强的人格消灭整合弱的人格！这不但解决了从开始观众的疑惑，而且推出了新的问题：剩下的4人格中有一个是杀人犯，不能让它留下。\n于是，假警察的身份被揭穿，经过一番争斗，假旅店老板被杀，而司机和假警察同归于尽。最终剩下Paris开车离开motel。\n\n此时，回过头分析这些人物的人格象征：\n（被杀害的顺序表示了胖子内心人格的强弱）\n1.过气女明星：象征着胖子心中社会虚伪自私的部分，是很弱势的人格，最先被消灭掉了。\n2.年轻丈夫Lou：年轻的新婚男子，象征着胖子理想中的亲生父亲。然而在他的现实生活中这个人并没有给他留下多大影响，于是只是一个模糊的形象，很快就消失了。\n3.连环杀人犯：从心里医生的叙述中我们可以得知，胖子正是因为小时候看到变态杀人才受刺激到心理扭曲的。于是这个形象代表了在胖子小时候杀人的那个犯人，他看起来就凶恶，并很快被杀。\n4.懦弱的父亲：胖子的真实生活中缺乏父爱而母亲又是妓女，于是他擅自捏造了这样一个继父的形象，懦弱，却最终因为救孩子而死。\n5.母亲：胖子对自己现实中母亲的印象只有妓女和很忙，于是他捏造了这样一个理想的母亲形象，这个母亲有点强势也明确爱他，却最早就出事故了，完全没能力照顾他。\n6.年轻妻子Ginny：可以说母亲在胖子生命中有着不可忽视的影响，于是他塑造了一个完美却无法做什么的母亲来爱他，又塑造了Ginny这样一个有点神经质假装怀孕的年轻妻子来照顾他（片中无数镜头都是ginny在搂着、安慰着小男孩timmy，并且为了保护他逃走而死）\n下面进入4个主要的也是活到后半段的心理人格：\n7.Larry:这个人可以说是胖子人格中最像正常人的部分：他看正常的综艺节目、贪财、胆小、懦弱，却也从没干过什么真的坏事，最像现实世界的芸芸众生。他直觉的厌恶妓女paris，却也帮助paris来对抗假警察，最终被假警察杀死。\n8.假警察：胖子塑造了假警察这个人格，他负责承担在过去杀害6个人的罪行。胖子就是受年幼时见到杀人犯刺激才心理扭曲，他自己长大后却也犯下了相同的罪孽，两个人的犯罪档案摆在了一起，胖子内心却不愿意承认自己也变成了当年那个变态那样的杀人犯，于是在内心吧这个人格伪装成一个警察。然而这个假警察最终要和真正的警察对决。\n9.司机（真警察）：这个司机可以说是所有正面形象的化身，胖子为自己塑造的完美形象。他虽然无意中撞了人（这个情节的安排，也许是胖子的正面人格愿意让自己相信自己的杀人行为是无意的）却勇于承担责任，有能力帮助保护身边的人。他因内心的谴责脱离了警察的退伍也显示了和假警察的区别。也只有他这个男性人格善意的对待Paris。这个人格是胖子对自己的理想。最终和假警察同归于尽。\n10.妓女Paris:这个人格集中了胖子内心对母亲是妓女这个事实的所有执念。她用身体骗钱，她受人歧视与轻视。她也同时希望改邪归正，能够单纯的回老家种橘子，而司机杀死了假警察，满足了她的愿望。\n\n然而，此时细心的观众一定有疑问，如果多重人格的胖子最终真的将他所有人格整合成一个，最终被留下的为什么是Paris这样一个曾经当过妓女的女性？是的，motel里有11个人，可是心理学家却只发现胖子的十个人格（9个善良1个邪恶）。\n\n最终出现了胖子最深层的人格：那个10岁的小男孩，他的母亲是一个无暇照料他的妓女，他无法原谅自己的母亲，他目睹了一个连环杀人犯的残忍行径，他长大后犯下了同样的罪行，他深藏在自己的心底——一边原谅自己，一遍惩罚自己，一边伪装自己，一边保护自己。\n终于，只剩自己。\n\n\nPS 想要了解关于人格分裂的更多故事，可以看心理学小说《24重人格》。每个人格的出现都有其深刻意义。专业学习心理的也许可以介绍更多相关知识。', '2018-05-07 22:26:00', 3436, 217);
INSERT INTO `comment` VALUES (1889243, '包包大人', 4.0, '太烧脑了!', '2018-05-08 20:53:12', 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for movies
-- ----------------------------
DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `movie_summary` text COLLATE utf8_bin NOT NULL,
  `movie_score` decimal(2,1) NOT NULL DEFAULT '0.0',
  `score_count` int(11) NOT NULL DEFAULT '0',
  `movie_aka` varchar(45) COLLATE utf8_bin NOT NULL,
  `movie_image` varchar(100) COLLATE utf8_bin NOT NULL,
  `movie_country` varchar(45) COLLATE utf8_bin NOT NULL,
  `movie_director` varchar(45) COLLATE utf8_bin NOT NULL,
  `movie_cast` varchar(45) COLLATE utf8_bin NOT NULL,
  `movie_year` int(11) NOT NULL,
  `movie_type` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of movies
-- ----------------------------
BEGIN;
INSERT INTO `movies` VALUES (1291560, 'となりのトトロ', '小月的母亲生病住院了，父亲带着她与四岁的妹妹小梅到乡间的居住。她们对那里的环境都感到十分新奇，也发现了很多有趣的事情。她们遇到了很多小精灵，她们来到属于她们的环境中，看到了她们世界中很多的奇怪事物，更与一只大大胖胖的龙猫成为了朋友。龙猫与小精灵们利用他们的神奇力量，为小月与妹妹带来了很多神奇的景观，令她们大开眼界。\n妹妹小梅常常挂念生病中的母亲，嚷着要姐姐带着她去看母亲，但小月拒绝了。小梅竟然自己前往，不料途中迷路了，小月只好寻找她的龙猫及小精灵朋友们帮助。', 9.1, 476240, '龙猫 / 邻居托托罗', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p537668599.jpg', '日本', '宫崎骏', '日高法子 / 坂本千夏 / 糸井重里 / 岛本须美 / 北林谷荣 / 高木均 / 雨笠利幸', 1988, '儿童 / 动画 / 奇幻 / 家庭');
INSERT INTO `movies` VALUES (1291561, '千と千尋の神隠し', '千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。\n千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消 失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一分工作才能不被魔法变成别的东西。\n千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。\n一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。\n为了救小白，千寻又踏上了她的冒险之旅。', 9.3, 767012, '千与千寻 / 神隐少女(台)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1606727862.jpg', '日本', '宫崎骏', '柊瑠美 / 入野自由 / 夏木真理 / 菅原文太 / 中村彰男 / 玉井夕海 / 神木隆之', 2001, '剧情 / 动画 / 奇幻');
INSERT INTO `movies` VALUES (1291579, 'Monsters, Inc.', '我们不知道，在那样的世界里住着那样一群怪物。他们长相滑稽，却必须装作狰狞。因为，在夜深的时候，他们要悄悄的出现在孩子的衣橱里，吓唬刚刚甜美睡去的宝宝。一切，只因为他们是怪物电力公司的员工，而孩子的尖叫，则是怪物王国发电的全部能量。怪物们害怕孩子，却又必须让孩子尖叫。在怪物的国度里，他们都是为全民造福的英雄。\n毛怪苏利文（约翰•古德曼）是怪物公司最出色的员工，业绩总是摇摇领先，他吓哭的小孩儿不计其数。他与搭档大眼怪麦克（比利•克里斯托）很受大家的爱戴。一次偶然，毛怪不小心把一个两岁的小女孩阿布（玛丽•吉布斯）带回了怪物世界，引起了极大的恐慌，调皮可爱的阿布把这些可怕的怪物吓的人仰马翻。警方在追捕阿布，而坏蛋亨利（詹姆斯•柯博）也计划利用阿布进行他改革工厂的邪恶计划。\n另一方面，在与阿布相处的过程中，毛怪渐渐对她产生莫名的情愫，甚至因此被放逐野外。可是一切都不能抵挡毛怪拯救女孩的信念，为了阿布，毛怪踏上了艰险的旅程……', 8.6, 258891, '怪兽电力公司 / 怪兽公司(港)', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2513247938.jpg', '美国', '彼特·道格特', '约翰·古德曼 / 比利·克里斯托 / 玛丽·吉布斯 / 史蒂夫·布西密 / 詹姆斯·柯本 ', 2001, '儿童 / 喜剧 / 动画 / 奇幻 / 冒险');
INSERT INTO `movies` VALUES (1291818, '飲食男女', '台湾中国菜硕果仅存的大师老朱（郎雄）退休后，渐尝老年生活的诸多尴尬：每周日费心做出的一桌丰盛菜肴，并无将三个女儿（杨贵媚、吴倩莲、王渝文）齐齐拉到饭桌的吸引力，已经长大成人的她们，心里藏了许多比陪父亲吃饭更重要的事；多年老友的突然离世，令他在友情这块也有了缺口；而对厨师来讲最重要的味觉的丧失，则将其彻底推到人生的低谷。\n三个女儿虽各忙各事，却也操心着老朱的晚年生活，计划着为其找个老伴，但她们没料到老朱早已悄无声息地谈起了“黄昏恋”。吃惊过后，老朱最看重的继承了他做菜天赋的二女儿家倩因为自身的生活经历，对父亲、她与父亲的关系有了新的认识，而对老朱来讲更大的惊喜，还在后面。', 9.1, 225021, '饮食男女 / Eat Drink Man Woman', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910899751.jpg', '台湾 / 美国', '李安', '郎雄 / 杨贵媚 / 吴倩莲 / 王渝文 / 张艾嘉 / 归亚蕾 / 赵文瑄 / 陈昭荣 ', 1994, '剧情 / 家庭');
INSERT INTO `movies` VALUES (1292722, 'Titanic', '1912年4月10日，号称 “世界工业史上的奇迹”的豪华客轮泰坦尼克号开始了自己的处女航，从英国的南安普顿出发驶往美国纽约。富家少女罗丝（凯特•温丝莱特）与母亲及未婚夫卡尔坐上了头等舱；另一边，放荡不羁的少年画家杰克（莱昂纳多·迪卡普里奥）也在码头的一场赌博中赢得了下等舱的船票。\n罗丝厌倦了上流社会虚伪的生活，不愿嫁给卡尔，打算投海自尽，被杰克救起。很快，美丽活泼的罗丝与英俊开朗的杰克相爱，杰克带罗丝参加下等舱的舞会、为她画像，二人的感情逐渐升温。\n1912年4月14日，星期天晚上，一个风平浪静的夜晚。泰坦尼克号撞上了冰山，“永不沉没的”泰坦尼克号面临沉船的命运，罗丝和杰克刚萌芽的爱情也将经历生死的考验。', 9.3, 758591, '泰坦尼克号 / 铁达尼号(港/台)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg', '美国', '詹姆斯·卡梅隆', '莱昂纳多·迪卡普里奥 / 凯特·温丝莱特 / 比利·赞恩 / 凯西·贝茨 / 弗兰西丝·费', 1997, '剧情 / 爱情 / 灾难');
INSERT INTO `movies` VALUES (1297192, 'Identity', '一个典型而又引人入胜的悬疑故事：一个汽车旅馆里，住进了10个人，他们中间有司机、妓女、过气女星、夫妇、警探和他的犯人，还有神秘的旅馆经理。这天风雨大作，通讯中断，10人被困在了旅馆里，惊悚的故事开始了。\n他们一个接一个的死去，并且按照顺序留下牌号。10个人存活下来的渐渐变少，他们开始恐慌，互相猜忌，却无意间发现了彼此间的联系。但是，大家怀疑的嫌疑人却纷纷死去，谜团笼罩在旅馆狭小的空间里，这样的凶杀案件却有着人们猜不到的真相……', 8.6, 345645, '致命ID / 杀人游戏', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p453720880.webp', '美国', 'James', 'John / Ray / Amanda / Alfred / Clea', 2003, '剧情 / 悬疑 / 惊悚');
INSERT INTO `movies` VALUES (1301753, 'The Lion King', '辛巴是狮子王国的小王子，他的父亲穆法沙是一个威严的国王。然而叔叔刀疤却对穆法沙的王位觊觎已久。\n要想坐上王位宝座，刀疤必须除去小王子。于是，刀疤利用种种借口让辛巴外出，然后伺机大开杀戒，无奈被穆法沙即时来救。在反复的算计下，穆法沙惨死在刀疤手下，刀疤别有用心的劝辛巴离开，一方面派人将他赶尽杀绝。\n辛巴逃亡中遇到了机智的丁满和善良的彭彭，他们抚养辛巴长成雄壮的大狮子，鼓励他回去森林复国。在接下来一场复国救民的斗争中，辛巴真正长成一个坚强的男子汉，领会了责任的真谛。', 8.9, 310652, '狮子王 / 狮子王3D', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p726659067.jpg', '美国', 'Roger', '乔纳森·泰勒·托马斯 / 马修·布罗德里克 / 杰瑞米·艾恩斯 / 詹姆斯·厄尔·琼斯 /', 1994, '剧情 / 动画 / 冒险 / 歌舞 / 家庭');
INSERT INTO `movies` VALUES (1858711, 'Toy Story 3', '距上一次的冒险已经过去11个年头，转眼间安迪（约翰·莫里斯 John Morris 配音）变成了17岁的阳光男孩。这年夏天，安迪即将开始大学生活，他必须将自己的房间收拾整齐留给妹妹。此前，伍迪（汤姆·汉克斯 Tom Hanks 配音）与巴斯光年（蒂姆·艾伦 Tim Allen 配音）等玩具一直期待安迪再和他们玩耍，但是随着岁月的流逝，他们被冷落在箱子里很久了。安迪十分珍惜这些童年的玩伴，于是准备将他们收在阁楼。谁曾想，妈妈却把玩具们当作废物扔到街道上。玩具们误解了安迪，于是愤然出走，宁可被捐赠到阳光之家幼儿园。\n伍迪尽力劝解大家，却收效甚微，只得独自黯然离开。巴斯光年他们原本以为将重新回到往昔的快乐时光，不料却陷入一场阴谋之中……', 8.8, 202438, '玩具总动员3 / 反斗奇兵3(港)', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1283675359.jpg', '美国', '李·昂克里奇', '汤姆·汉克斯 / 蒂姆·艾伦 / 琼·库萨克 / 尼德·巴蒂 / 唐·里克斯 / 迈克尔·', 2010, '喜剧 / 动画 / 奇幻 / 冒险');
INSERT INTO `movies` VALUES (1889243, 'Interstellar', '近未来的地球黄沙遍野，小麦、秋葵等基础农作物相继因枯萎病灭绝，人类不再像从前那样仰望星空，放纵想象力和灵感的迸发，而是每日在沙尘暴的肆虐下倒数着所剩不多的光景。在家务农的前NASA宇航员库珀（马修·麦康纳 Matthew McConaughey 饰）接连在女儿墨菲（麦肯吉·弗依 Mackenzie Foy 饰）的书房发现奇怪的重力场现象，随即得知在某个未知区域内前NASA成员仍秘密进行一个拯救人类的计划。多年以前土星附近出现神秘虫洞，NASA借机将数名宇航员派遣到遥远的星系寻找适合居住的星球。在布兰德教授（迈克尔·凯恩 Michael Caine 饰）的劝说下，库珀忍痛告别了女儿，和其他三名专家教授女儿艾米莉亚·布兰德（安妮·海瑟薇 Anne Hathaway 饰）、罗米利（大卫·吉雅西 David Gyasi 饰）、多伊尔（韦斯·本特利 Wes Bentley 饰）搭乘宇宙飞船前往目前已知的最有希望的三颗星球考察。\n他们穿越遥远的星系银河，感受了一小时七年光阴的沧海桑田，窥见了未知星球和黑洞的壮伟与神秘。在浩瀚宇宙的绝望而孤独角落，总有一份超越了时空的笃定情怀将他们紧紧相连……', 9.2, 563835, '星际穿越 / 星际启示录(港)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2206088801.jpg', '美国 / 英国 / 加拿大 / 冰岛', '克里斯托弗·诺兰', '马修·麦康纳 / 安妮·海瑟薇 / 杰西卡·查斯坦 / 卡西·阿弗莱克 / 迈克尔·凯恩 ', 2014, '剧情 / 科幻 / 冒险');
INSERT INTO `movies` VALUES (2131459, 'WALL·E', '公元2805年，人类文明高度发展，却因污染和生活垃圾大量增加使得地球不再适于人类居住。地球人被迫乘坐飞船离开故乡，进行一次漫长无边的宇宙之旅。临行前他们委托Buynlarge的公司对地球垃圾进行清理，该公司开发了名为WALL·E（Waste Allocation Loa d Lifters – Earth 地球废品分装员）的机器人担当此重任。\n这些机器人按照程序日复一日、年复一年辛勤工作，但随着时间的流逝和恶劣环境的侵蚀，WALL·E们接连损坏、停止运动。最后只有一个仍在进行这项似乎永无止境的工作。经历了漫长的岁月，它开始拥有了自己的意识。它喜欢将收集来的宝贝小心翼翼藏起，喜欢收工后看看几百年前的歌舞片，此外还有一只蟑螂朋友作伴。直到有一天，一艘来自宇宙的飞船打破了它一成不变的生活……\n本片荣获2009年第81届奥斯卡最佳动画长片奖。', 9.3, 561833, '机器人总动员 / 瓦力(台)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.webp', '美国', '安德鲁·斯坦顿', '本·贝尔特 / 艾丽莎·奈特 / 杰夫·格尔林 / 佛莱德·威拉特 / 西格妮·韦弗 / ', 2008, '爱情 / 科幻 / 动画 / 冒险');
INSERT INTO `movies` VALUES (2353023, 'How to Train Your Dragon', '维京岛国的少年小嗝嗝（杰伊•巴鲁切尔 Jay Baruchel 配音）是部落统领伟大的斯托里克（杰拉德·巴特勒 Gerard Butler 配音）的儿子，他非常想像自己的父亲一样亲手屠龙——这些飞龙是岛上维京人放牧羊群的主要天敌——但他每次出现在部落屠龙的战斗中都只给大家徒增烦恼。在一次对抗飞龙的战斗中，希卡普偷偷用射龙器击伤了一只最神秘的“夜之怒龙”，并背着族人放生、豢养，甚至驯服了这只龙，还给它起名“无牙”。希卡普的神秘行径引起了一同训练屠龙技巧的女孩阿斯特丽德（亚美莉卡·费雷拉 America Ferrera 配音）的怀疑。阿斯特丽德发现了希卡普的秘密，却同时被身骑“无牙”御风而飞的美妙体验所震撼。格雷决定在屠龙成人礼上向远征归来的斯托里克和族人讲明真相，说服大家放弃屠龙，却偏偏弄巧成拙，害得“无牙”被俘，一场更大的灾难就在眼前……', 8.7, 306090, '驯龙高手 / 驯龙记(港)', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p450042258.jpg', '美国', '迪恩·德布洛斯', '杰伊·巴鲁切尔 / 杰拉德·巴特勒 / 克雷格·费格森 / 亚美莉卡·费雷拉 / 乔纳·希', 2010, '喜剧 / 动画 / 奇幻 / 冒险 / 家庭');
INSERT INTO `movies` VALUES (3793023, '3 Idiots', '本片根据印度畅销书作家奇坦·巴哈特（Chetan Bhagat）的处女作小说《五点人》（Five Point Someone）改编而成。法兰（马德哈万 R Madhavan 饰）、拉杜（沙曼·乔希 Sharman Joshi 饰）与兰乔（阿米尔·汗 Aamir Khan 饰）是皇家工程学院的学生，三人共居一室，结为好友。在以严格著称的学院里，兰乔是个非常与众不同的学生，他不死记硬背，甚至还公然顶撞校长“病毒”（波曼·伊拉尼 Boman Irani 饰），质疑他的教学方法。他不仅鼓动法兰与拉杜去勇敢追寻理想，还劝说校长的二女儿碧雅（卡琳娜·卡普 Kareena Kapoor 饰）离开满眼铜臭的未婚夫。兰乔的特立独行引起了模范学生“消音器”（奥米·维嘉 Omi Vaidya 饰）的不满，他约定十年后再与兰乔一决高下，看哪种生活方式更能取得成功。\n本片获孟买电影博览奖最佳影片、最佳导演、最佳配角（波曼·伊拉尼）、最佳剧本等六项大奖，并获国际印度电影协会最佳影片、最佳导演、最佳剧情、最佳摄影等十六项大奖。', 9.2, 770648, '三傻大闹宝莱坞 / 三个傻瓜(台)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p579729551.webp', '印度', '拉库马·希拉尼', '阿米尔·汗 / 卡琳娜·卡普 / 德瓦汉 / 沙尔曼·乔什 / 奥米·瓦依达 / 波曼·伊', 2009, '剧情 / 喜剧 / 爱情 / 歌舞');
INSERT INTO `movies` VALUES (4920389, 'Ready Player One', '故事发生在2045年，虚拟现实技术已经渗透到了人类生活的每一个角落。詹姆斯哈利迪（马克·里朗斯 Mark Rylance 饰）一手建造了名为“绿洲”的虚拟现实游戏世界，临终前，他宣布自己在游戏中设置了一个彩蛋，找到这枚彩蛋的人即可成为绿洲的继承人。要找到这枚彩蛋，必须先获得三把钥匙，而寻找钥匙的线索就隐藏在詹姆斯的过往之中。\n韦德（泰尔·谢里丹 Tye Sheridan 饰）、艾奇（丽娜·维特 Lena Waithe 饰）、大东（森崎温 饰）和修（赵家正 饰）是游戏中的好友，和之后遇见的阿尔忒弥斯（奥利维亚·库克 Olivia Cooke 饰）一起，五人踏上了寻找彩蛋的征程。他们所要对抗的，是名为诺兰索伦托（本·门德尔森 Ben Mendelsohn 饰）的大资本家。', 8.9, 410124, '头号玩家 / 玩家一号', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2516578307.jpg', '美国', '史蒂文·斯皮尔伯格', '泰伊·谢里丹 / 奥利维亚·库克 / 本·门德尔森 / 马克·里朗斯 / 丽娜·维特 / ', 2018, '动作 / 科幻 / 冒险');
INSERT INTO `movies` VALUES (25662329, 'Zootopia', '故事发生在一个所有哺乳类动物和谐共存的美好世界中，兔子朱迪（金妮弗·古德温 Ginnifer Goodwin 配音）从小就梦想着能够成为一名惩恶扬善的刑警，凭借着智慧和努力，朱迪成功的从警校中毕业进入了疯狂动物城警察局，殊不知这里是大型肉食类动物的领地，作为第一只，也是唯一的小型食草类动物，朱迪会遇到怎样的故事呢？\n近日里，城中接连发生动物失踪案件，就在全部警员都致力于调查案件真相之时，朱迪却被局长（伊德瑞斯·艾尔巴 Idris Elba 配音）发配成为了一名无足轻重的交警。某日，正在执勤的兔子遇见了名为尼克（杰森·贝特曼 Jason Bateman 配音）的狐狸，两人不打不相识，之后又误打误撞的接受了寻找失踪的水獭先生的任务，如果不能在两天之内找到水獭先生，朱迪就必须自愿离开警局。朱迪找到了尼克，两人联手揭露了一个隐藏在疯狂动物城之中的惊天秘密。', 9.2, 589914, '疯狂动物城 / 优兽大都会(港)', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2315672647.jpg', '美国', '拜伦·霍华德', '金妮弗·古德温 / 杰森·贝特曼 / 伊德里斯·艾尔巴 / 珍妮·斯蕾特 / 内特·托伦斯', 2016, '喜剧 / 动画 / 冒险');
INSERT INTO `movies` VALUES (26420932, 'Baahubali 2: The Conclusion', '同蛮族的大战以摩喜施末底的胜利而告终，根据战场上的表现，希瓦伽米太后（拉姆亚·克里希南饰）选择了养子阿玛兰德拉·巴霍巴利（帕拉巴斯饰）作为王国的王储。在加冕典礼之前太后交给巴霍巴利的最后一项任务是游历王国，体察臣民的疾苦，理解\'臣民的审判\'。同时，太后还竭尽全力满足自己的亲子巴拉拉德夫德斯（纳拉·达古巴提饰）的各种需求，希望能够克制他的贪婪，平衡兄弟的关系。\n巴霍巴利经过一个叫昆达拉的诸侯小国时，偶遇美丽绝伦、剑术高超的提婆犀那公主（安努舒卡·谢蒂饰），立刻惊为天人，无以自拔。同行的卡塔帕将军（萨蒂亚拉吉饰）灵机一动，让巴霍巴利装成傻子去接近公主，在妙趣横生的交往中，感情在慢慢滋生。这时，希瓦伽米太后派人来到昆达拉为子提亲，遭到提婆犀那的拒绝。一个夜晚，蛮族忽然入侵昆达拉，王国命运危在旦夕，这时巴霍巴利有如天兵天将，凭借其盖世武功将敌军击退。正在此时，盛怒之下的希瓦伽米太后给巴霍巴利发来讯息，要将提婆犀那以囚犯的身份抓回国内。\n巴霍巴利回到国内后，形势陡然而变，太后将如何制裁对自己不敬的提婆犀那？巴拉拉德夫德斯会接受自己的失败吗？巴霍巴利是如何走到生命的终点？这一切都要在二十五年后由卡塔帕向阿玛兰德拉·巴霍巴利之子——摩哂陀·巴霍巴利（帕拉巴斯饰）娓娓道来。而摩哂陀面对着空前强大的敌人，要为这段故事、这段历史书写结局。', 7.1, 11899, '巴霍巴利王2：终结 / 巴霍巴利王(下)', 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2521118750.webp', '印度', 'S·S·拉贾穆里', '帕拉巴斯 / 拉纳·达格巴提 / 安努舒卡·谢蒂 / 特曼娜·芭蒂亚 / 萨伯拉杰 / 拉', 2017, '剧情 / 动作 / 奇幻');
INSERT INTO `movies` VALUES (26683723, '后来的我们', '这是一个爱情故事，关于一对异乡漂泊的年轻人。\n十年前，见清和小晓偶然地相识在归乡过年的火车上。两人怀揣着共同的梦想，一起在北京打拼，并开始了一段相聚相离的情感之路。\n十年后，见清和小晓在飞机上再次偶然重逢……\n命运似乎是一个轮回。在一次次的偶然下，平行线交叉，再平行，故事始终有“然后”。可后来的他们，学会如何去爱了吗？', 5.8, 111293, 'Us and Them', 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2519994468.jpg', '中国大陆', '刘若英', '井柏然 / 周冬雨 / 田壮壮 / 曲哲明 / 刘启恒 / 苏小明 / 邹倚天 / 张子贤', 2018, '剧情 / 爱情');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
