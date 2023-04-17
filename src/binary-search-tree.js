const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  root() {
    return this.rootNode ? this.rootNode : null;
  }

  add(data) {
    if (!this.rootNode) this.rootNode = new Node(data);
    else {
      this.findPlace(this.rootNode, data)
    }
  }

  findPlace(parentNode, value) {
    if (value < parentNode.data) {
      if (parentNode.left === null) parentNode.left = new Node(value);
      else this.findPlace(parentNode.left, value);
    }
    else {
      if (parentNode.right === null) parentNode.right = new Node(value);
      else this.findPlace(parentNode.right, value);
    }
  }

  has(data) {
    return this.findNode(this.rootNode, data) ? true : false;
  }

  find(data) {
    return this.findNode(this.rootNode, data)
  }

  findNode(node, value) {
    if (node === null) return null;
    else if (node.data === value) return node;
    else {
      if (value < node.data) return this.findNode(node.left, value);
      else return this.findNode(node.right, value);
    }
  }

  remove(data) {
    if (this.rootNode.data === data) {
      if (this.rootNode.left === null && this.rootNode.right === null) this.rootNode = null;
      else if (this.rootNode.left === null) this.rootNode = this.rootNode.right;
      else if (this.rootNode.right === null) this.rootNode = this.rootNode.left;
      else {
        const temp = this.findMinChild(this.rootNode.right);
        this.remove(temp.data);
        this.rootNode.data = temp.data;
      }
    }
    this.findToRemove(this.rootNode, data);
  }

  findToRemove(node, value) {
    if (node === null) return;
    if (value < node.data) {
      if (node.left) {
        if (node.left.data === value) {
          if (node.left.left === null && node.left.right === null) node.left = null;
          else if (node.left.left === null) node.left = node.left.right;
          else if (node.left.right === null) node.left = node.left.left;
          else {
            const temp = this.findMinChild(node.left.right);
            this.remove(temp.data);
            node.left.data = temp.data;
          }
        }
        else this.findToRemove(node.left, value);
      }
    }
    else {
      if (node.right) {
        if (node.right.data === value) {
          if (node.right.left === null && node.right.right === null) node.right = null;
          else if (node.right.left === null) node.right = node.right.right;
          else if (node.right.right === null) node.right = node.right.left;
          else {
            const temp = this.findMinChild(node.right.right);
            this.remove(temp.data);
            node.right.data = temp.data;
          }
        }
        else this.findToRemove(node.right, value);
      }
    }
  }

  findMinChild(start) {
    let node = start;
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  min() {
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};