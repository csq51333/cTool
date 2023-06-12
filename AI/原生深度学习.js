// 导入Math.js库
import * as math from 'mathjs';

// 定义神经网络模型
class NeuralNetwork {
  constructor(inputSize, hiddenSize, outputSize) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;

    // 随机初始化模型参数
    this.W1 = math.random([this.inputSize, this.hiddenSize], -1, 1);
    this.b1 = math.zeros([1, this.hiddenSize]);
    this.W2 = math.random([this.hiddenSize, this.outputSize], -1, 1);
    this.b2 = math.zeros([1, this.outputSize]);
  }

  // 前向传播
  predict(X) {
    this.z1 = math.add(math.multiply(X, this.W1), this.b1);
    this.a1 = math.tanh(this.z1);
    this.z2 = math.add(math.multiply(this.a1, this.W2), this.b2);
    return math.sigmoid(this.z2);
  }

  // 计算损失
  loss(X, y) {
    const yHat = this.predict(X);
    return math.mean(math.subtract(yHat, y).pow(2));
  }

  // 训练模型
  train(X, y, learningRate, epochs) {
    for (let i = 0; i < epochs; i++) {
      const yHat = this.predict(X);
      const dLdyHat = math.subtract(yHat, y);
      const dLdz2 = math.dotMultiply(dLdyHat, math.sigmoid(this.z2).multiply(-1).add(1));
      const dLdW2 = math.multiply(math.transpose(this.a1), dLdz2);
      const dLdb2 = math.sum(dLdz2, 0);
      const dLda1 = math.multiply(dLdz2, math.transpose(this.W2));
      const dLdz1 = math.dotMultiply(dLda1, math.pow(math.cosh(this.z1), -2));
      const dLdW1 = math.multiply(math.transpose(X), dLdz1);
      const dLdb1 = math.sum(dLdz1, 0);
      this.W2 = math.subtract(this.W2, math.multiply(learningRate, dLdW2));
      this.b2 = math.subtract(this.b2, math.multiply(learningRate, dLdb2));
      this.W1 = math.subtract(this.W1, math.multiply(learningRate, dLdW1));
      this.b1 = math.subtract(this.b1, math.multiply(learningRate, dLdb1));
    }
  }
}

// 加载数据集
const X = math.random([1000, 2]);
const y = math.dotMultiply(X.slice([null, 0], [null, 1]).subtract(0.5).pow(2).add(X.slice([null, 1], [null, 2]).subtract(0.5).pow(2)).flatten(), -1).add(0.25).add(math.random([1000], -0.1, 0.1));
const labels = math.round(math.sigmoid(y).flatten());

// 创建神经网络模型
const model = new NeuralNetwork(2, 5, 1);

// 训练模型
model.train(X, labels, 0.5, 1000);

// 进行预测
const predictions = model.predict(X);
console.log(predictions);
