import datetime

VERSION = "1.0.0"

def update_readme():
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(f"# 小工具网站 (v{VERSION})\n\n")
        f.write("## 产品功能\n")
        f.write("- 首页显示美元和欧元兑换其他货币的每日汇率\n")
        f.write("- 提供两个实用小工具\n")
        f.write("- 左侧栏显示工具列表,右侧显示工具内容\n")
        f.write("- 可以方便地在不同工具之间切换\n")
        f.write("- 抛货计算器: 根据长、宽、高和实际重量计算是否为抛货\n")
        f.write("- 运费模板计算器: 根据给定参数生成运费模板,支持人民币和美元显示\n\n")
        
        f.write("## 技术栈\n")
        f.write("- HTML5\n")
        f.write("- CSS3 (改进的UI设计)\n")
        f.write("- JavaScript (使用Fetch API获取每日汇率)\n")
        f.write("- Python (用于自动更新 README.md)\n\n")
        
        f.write("## 更新记录\n")
        f.write("- 2023-04-14 10:30:00: 初始版本完成\n")
        f.write("- 2023-04-14 11:15:00: 添加抛货计算器功能\n")
        f.write("- 2023-04-14 12:00:00: 添加运费模板计算器功能\n")
        f.write("- 2023-04-14 13:00:00: 运费模板计算器添加美元显示功能\n")
        f.write("- 2023-04-14 14:00:00: 优化UI界面,提升用户体验\n")
        f.write("- 2023-04-14 15:00:00: 删除多余工具,保留抛货计算和运费模板计算\n")
        f.write("- 2023-04-14 16:00:00: 添加首页,显示实时汇率\n")
        f.write("- 2023-04-14 17:00:00: 更换为免费汇率API,显示每日汇率\n")
        f.write(f"- {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: 合并两个首页,显示美元和欧元的汇率\n")
        f.write(f"- {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: 修复左侧导航栏重复显示首页的问题\n")
        f.write(f"- {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}: 添加页面底部版本信息\n")

if __name__ == "__main__":
    update_readme()