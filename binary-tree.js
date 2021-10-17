/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    const findMinDepth = (node) => {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return findMinDepth(node.right) + 1;
      if (node.right === null) return findMinDepth(node.left) + 1;
      
      return Math.min(findMinDepth(node.left), findMinDepth(node.right)) + 1;
    }

    return findMinDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    const findMaxDepth = (node) => {
      if (node.left === null && node.right === null) return 1;
      if (node.left === null) return findMaxDepth(node.right) + 1;
      if (node.right === null) return findMaxDepth(node.left) + 1;

      return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
    }

    return findMaxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let total = 0;

    const findMaxSum = (node) => {
      if (node === null) return 0;
      const leftSum = findMaxSum(node.left);
      const rightSum = findMaxSum(node.right);

      total = Math.max(total, node.val + leftSum + rightSum);

      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    findMaxSum(this.root);
    return total;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let nextLargerVal = null;
    
    while (queue.length) {
      let currNode = queue.shift();
      let currVal = currNode.val;
      
      (currVal > lowerBound && (currVal < nextLargerVal || !nextLargerVal)) 
        ? nextLargerVal = currVal 
        : null;
        
      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
    }

    return nextLargerVal;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
