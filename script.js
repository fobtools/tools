const tools = [
    {
        name: "抛货计算",
        content: `
            <h3>抛货计算器</h3>
            <form id="volumeWeightForm">
                <label for="length">长度 (cm):</label>
                <input type="number" id="length" required><br>
                <label for="width">宽度 (cm):</label>
                <input type="number" id="width" required><br>
                <label for="height">高度 (cm):</label>
                <input type="number" id="height" required><br>
                <label for="weight">实际重量 (kg):</label>
                <input type="number" id="weight" required><br>
                <button type="submit">计算</button>
            </form>
            <div id="result"></div>
        `
    },
    {
        name: "运费模板计算",
        content: `
            <h3>运费模板计算器</h3>
            <form id="shippingTemplateForm">
                <label for="baseWeight">起始重量 (kg):</label>
                <input type="number" id="baseWeight" step="0.1" required><br>
                <label for="maxWeight">最大重量 (kg):</label>
                <input type="number" id="maxWeight" step="0.1" required><br>
                <label for="pricePerKg">每公斤价格 (元):</label>
                <input type="number" id="pricePerKg" step="0.01" required><br>
                <label for="registrationFee">挂号费 (元):</label>
                <input type="number" id="registrationFee" step="0.01" required><br>
                <label for="weightInterval">重量区间 (kg):</label>
                <input type="number" id="weightInterval" step="0.1" value="0.1" required><br>
                <label for="exchangeRate">汇率 (元/美元):</label>
                <input type="number" id="exchangeRate" step="0.0001" required><br>
                <button type="submit">生成模板</button>
            </form>
            <div id="templateResult"></div>
        `
    }
];

function initializeTools() {
    const toolList = document.getElementById("toolList");
    const toolTitle = document.getElementById("toolTitle");
    const toolContent = document.getElementById("toolContent");

    tools.forEach((tool, index) => {
        const li = document.createElement("li");
        li.textContent = tool.name;
        li.addEventListener("click", () => {
            toolTitle.textContent = tool.name;
            toolContent.innerHTML = tool.content;
            if (tool.name === "抛货计算") {
                initializeVolumeWeightCalculator();
            } else if (tool.name === "运费模板计算") {
                initializeShippingTemplateCalculator();
            }
        });
        toolList.appendChild(li);
    });
}

function initializeVolumeWeightCalculator() {
    const form = document.getElementById("volumeWeightForm");
    const result = document.getElementById("result");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const length = parseFloat(document.getElementById("length").value);
        const width = parseFloat(document.getElementById("width").value);
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        const volumeWeight = (length * width * height) / 5000;
        const shippingWeight = Math.max(volumeWeight, weight);

        result.innerHTML = `
            <p>体积重量: ${volumeWeight.toFixed(2)} kg</p>
            <p>实际重量: ${weight.toFixed(2)} kg</p>
            <p>计费重量: ${shippingWeight.toFixed(2)} kg</p>
            <p>计费方式: ${shippingWeight > weight ? "抛货" : "实重"}</p>
        `;
    });
}

function initializeShippingTemplateCalculator() {
    const form = document.getElementById("shippingTemplateForm");
    const result = document.getElementById("templateResult");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const baseWeight = parseFloat(document.getElementById("baseWeight").value);
        const maxWeight = parseFloat(document.getElementById("maxWeight").value);
        const pricePerKg = parseFloat(document.getElementById("pricePerKg").value);
        const registrationFee = parseFloat(document.getElementById("registrationFee").value);
        const weightInterval = parseFloat(document.getElementById("weightInterval").value);
        const exchangeRate = parseFloat(document.getElementById("exchangeRate").value);

        let template = "";
        let usdTemplate = "";
        for (let weight = baseWeight; weight <= maxWeight; weight += weightInterval) {
            const roundedWeight = Math.round(weight * 10) / 10; // 四舍五入到0.1kg
            const price = Math.ceil(registrationFee + pricePerKg * roundedWeight); // 向上取整到整数
            const usdPrice = Math.ceil(price / exchangeRate); // 转换为美元并向上取整到整数
            template += `${roundedWeight.toFixed(1)}:${price}`;
            usdTemplate += `${roundedWeight.toFixed(1)}:${usdPrice}`;
            if (weight + weightInterval <= maxWeight) {
                template += ",";
                usdTemplate += ",";
            }
        }

        result.innerHTML = `
            <h4>生成的运费模板 (人民币):</h4>
            <p>${template}</p>
            <h4>生成的运费模板 (美元):</h4>
            <p>${usdTemplate}</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", initializeTools);