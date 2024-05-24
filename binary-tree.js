/** BinaryTreeNode: node for a binary tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** BinaryTree: binary tree with a root. */

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    const dfs = (node) => {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;
      return Math.min(dfs(node.left), dfs(node.right)) + 1;
    };

    return dfs(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    const dfs = (node) => {
      if (!node) return 0;
      const leftDepth = dfs(node.left);
      const rightDepth = dfs(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    };

    return dfs(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) return 0;

    let maxSum = -Infinity;

    const dfs = (node) => {
      if (!node) return 0;
      const leftSum = Math.max(0, dfs(node.left));
      const rightSum = Math.max(0, dfs(node.right));
      maxSum = Math.max(maxSum, leftSum + rightSum + node.val);
      return Math.max(leftSum, rightSum) + node.val;
    };

    dfs(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let nextLarger = null;

    const inOrderTraversal = (node) => {
      if (!node) return;
      inOrderTraversal(node.left);
      if (node.val > lowerBound && (!nextLarger || node.val < nextLarger)) {
        nextLarger = node.val;
      }
      inOrderTraversal(node.right);
    };

    inOrderTraversal(this.root);
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    // This method is optional and can be implemented separately.
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    if (!tree.root) return "[]";

    const queue = [tree.root];
    const serialized = [];

    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        serialized.push(node.val);
        queue.push(node.left);
        queue.push(node.right);
      } else {
        serialized.push(null);
      }
    }

    while (serialized[serialized.length - 1] === null) {
      serialized.pop();
    }

    return JSON.stringify(serialized);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree || stringTree === "[]") return new BinaryTree();

    const serialized = JSON.parse(stringTree);
    const root = new BinaryTreeNode(serialized.shift());
    const queue = [root];

    while (serialized.length > 0) {
      const parent = queue.shift();
      const leftVal = serialized.shift();
      const rightVal = serialized.shift();
      if (leftVal !== null) {
        const leftNode = new BinaryTreeNode(leftVal);
        parent.left = leftNode;
        queue.push(leftNode);
      }
      if (rightVal !== null) {
        const rightNode = new BinaryTreeNode(rightVal);
        parent.right = rightNode;
        queue.push(rightNode);
      }
    }

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    if (!this.root) return null;

    const dfs = (node) => {
      if (!node) return null;
      if (node === node1 || node === node2) return node;

      const left = dfs(node.left);
      const right = dfs(node.right);

      if (left && right) return node;
      return left ? left : right;
    };

    return dfs(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
