export class BinaryTree {
    constructor() {
      this.root = null;
    }
  
    preorderTraversal(node = this.root, steps = []) {
      if (!node) return steps;
      steps.push(node.value); 
      this.preorderTraversal(node.left, steps);   
      this.preorderTraversal(node.middle, steps); 
      this.preorderTraversal(node.right, steps);  
      return steps;
    }
  
    inorderTraversal(node = this.root, steps = []) {
      if (!node) return steps;
      this.inorderTraversal(node.left, steps);   
      steps.push(node.value);                    
      this.inorderTraversal(node.middle, steps); 
      this.inorderTraversal(node.right, steps);  
      return steps;
    }
  
    postorderTraversal(node = this.root, steps = []) {
      if (!node) return steps;
      this.postorderTraversal(node.left, steps);   
      this.postorderTraversal(node.middle, steps); 
      this.postorderTraversal(node.right, steps);  
      steps.push(node.value);                      
      return steps;
    }
  
    breadthFirstTraversal() {
      if (!this.root) return [];
      const queue = [this.root];
      const steps = [];
      while (queue.length > 0) {
        const node = queue.shift(); 
        steps.push(node.value);     
        if (node.left) queue.push(node.left);     
        if (node.middle) queue.push(node.middle); 
        if (node.right) queue.push(node.right);   
      }
      return steps;
    }
  }
  