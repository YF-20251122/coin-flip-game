javascript
// 游戏状态
const gameState = {
    coins: [], // 存储18个硬币的状态
    flipCount: 0, // 投掷次数
    rows: 6,
    cols: 3
};

// 初始化游戏
function initGame() {
    createGameBoard();
    flipAllCoins();
    updateStats();
    
    // 绑定按钮事件
    document.getElementById('flipButton').addEventListener('click', flipAllCoins);
}

// 创建游戏面板
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // 清空现有内容
    
    // 创建6行
    for (let row = 0; row < gameState.rows; row++) {
        // 创建3个硬币单元格
        for (let col = 0; col < gameState.cols; col++) {
            const coinIndex = row * gameState.cols + col;
            const coinCell = document.createElement('div');
            coinCell.className = 'coin-cell';
            coinCell.id = `coin-${coinIndex}`;
            coinCell.dataset.index = coinIndex;
            coinCell.dataset.row = row;
            
            // 添加数字显示元素
            const coinValue = document.createElement('span');
            coinValue.className = 'coin-value';
            coinCell.appendChild(coinValue);
            
            gameBoard.appendChild(coinCell);
        }
        
        // 创建第4列（总和单元格）
        const sumCell = document.createElement('div');
        sumCell.className = 'sum-cell';
        sumCell.id = `sum-${row}`;
        gameBoard.appendChild(sumCell);
    }
}

// 投掷所有硬币
function flipAllCoins() {
    gameState.flipCount++;
    
    // 生成18个随机硬币状态
    gameState.coins = [];
    for (let i = 0; i < gameState.rows * gameState.cols; i++) {
        const isHead = Math.random() > 0.5;
        gameState.coins.push({
            index: i,
            isHead: isHead,
            value: isHead ? 3 : 2
        });
    }
    
    // 更新显示
    updateCoinsDisplay();
    updateRowSums();
    updateStats();
}

// 更新硬币显示
function updateCoinsDisplay() {
    gameState.coins.forEach(coin => {
        const coinCell = document.getElementById(`coin-${coin.index}`);
        const coinValue = coinCell ? coinCell.querySelector('.coin-value') : null;
        
        if (coinCell && coinValue) {
            // 添加翻转动画
            coinCell.classList.add('flipping');
            
            // 更新内容和样式
            setTimeout(() => {
                coinValue.textContent = coin.value;
                coinCell.classList.remove('coin-head', 'coin-tail');
                coinCell.classList.add(coin.isHead ? 'coin-head' : 'coin-tail');
                coinCell.classList.remove('flipping');
            }, 300); // 动画进行到一半时更新内容
        }
    });
}

// 更新每行的总和
function updateRowSums() {
    for (let row = 0; row < gameState.rows; row++) {
        let sum = 0;
        
        // 计算该行的3个硬币总和
        for (let col = 0; col < gameState.cols; col++) {
            const coinIndex = row * gameState.cols + col;
            const coin = gameState.coins[coinIndex];
            if (coin) {
                sum += coin.value;
            }
        }
        
        // 更新总和单元格显示
        const sumCell = document.getElementById(`sum-${row}`);
        if (sumCell) {
            sumCell.textContent = sum;
        }
    }
}

// 更新统计信息
function updateStats() {
    const flipCountElement = document.getElementById('flipCount');
    if (flipCountElement) {
        flipCountElement.textContent = gameState.flipCount;
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
