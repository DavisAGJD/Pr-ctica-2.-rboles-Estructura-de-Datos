import { Node } from "./node.js";
import { BinaryTree } from "./binarytree.js";

const trees = [];

// Árbol 1
const tree1 = new BinaryTree();
tree1.root = new Node("H");
tree1.root.left = new Node("I");
tree1.root.right = new Node("M");
tree1.root.left.left = new Node("E");
tree1.root.left.right = new Node("A");
trees.push({ tree: tree1, id: 1 });

// Árbol 2
const tree2 = new BinaryTree();
tree2.root = new Node("F");
tree2.root.left = new Node("B");
tree2.root.right = new Node("G");
tree2.root.left.left = new Node("A");
tree2.root.left.right = new Node("D");
tree2.root.left.right.left = new Node("C");
tree2.root.left.right.right = new Node("E");
tree2.root.right.right = new Node("I");
tree2.root.right.right.left = new Node("H");
trees.push({ tree: tree2, id: 2 });

// Árbol 3
const tree3 = new BinaryTree();
tree3.root = new Node(55);
tree3.root.left = new Node(53);
tree3.root.right = new Node(59);
tree3.root.left.left = new Node(48);
tree3.root.left.right = new Node(54);
tree3.root.left.left.right = new Node(51);
tree3.root.right.left = new Node(56);
tree3.root.right.right = new Node(63);
tree3.root.right.left.right = new Node(57);
tree3.root.right.right.left = new Node(61);
tree3.root.right.right.right = new Node(70);
trees.push({ tree: tree3, id: 3 });

// Árbol 4
const tree4 = new BinaryTree();
tree4.root = new Node("A");
tree4.root.left = new Node("B");
tree4.root.right = new Node("C");
tree4.root.left.left = new Node("D");
tree4.root.left.right = new Node("E");
tree4.root.left.right.left = new Node("J");
tree4.root.left.right.left.left = new Node("Q");
tree4.root.left.right.left.right = new Node("R");
tree4.root.left.right.right = new Node("K");
tree4.root.left.right.right.right = new Node("F");
tree4.root.right.left = new Node("G");
tree4.root.right.left.left = new Node("L");
tree4.root.right.left.right = new Node("M");
tree4.root.right.right = new Node("H");
tree4.root.right.right.left = new Node("Ñ");
tree4.root.right.right.right = new Node("P");
tree4.root.right.right.right.right = new Node("I");
tree4.root.right.right.right.left = new Node("O");
trees.push({ tree: tree4, id: 4 });

// Árbol 5
const tree5 = new BinaryTree();
tree5.root = new Node("A");
tree5.root.left = new Node("B");
tree5.root.right = new Node("C");
tree5.root.left.left = new Node("D");
tree5.root.left.right = new Node("E");
tree5.root.left.left.left = new Node("H");
tree5.root.left.left.right = new Node("I");
tree5.root.left.right.left = new Node("J");
tree5.root.left.right.right = new Node("K");
tree5.root.right.left = new Node("F");
tree5.root.right.right = new Node("G");
tree5.root.right.left.left = new Node("L");
tree5.root.right.left.right = new Node("M");
tree5.root.right.right.left = new Node("N");
tree5.root.right.right.left.left = new Node("O");
tree5.root.right.right.left.left.left = new Node("X");
tree5.root.right.right.left.left.right = new Node("Y");
trees.push({ tree: tree5, id: 5 });

// Función para renderizar los árboles
function renderTree(tree, id) {
  const container = document.createElement("div");
  container.classList.add("tree-container");
  container.innerHTML = `<h2>Árbol ${id}</h2>`;

  function traverse(node, level = 0) {
    if (!node) return;
    let levelContainer = container.querySelector(`.level-${level}`);
    if (!levelContainer) {
      levelContainer = document.createElement("div");
      levelContainer.classList.add("node-level", `level-${level}`);
      container.appendChild(levelContainer);
    }
    const nodeElement = document.createElement("div");
    nodeElement.classList.add("node");
    nodeElement.innerText = node.value;
    nodeElement.id = `node-${id}-${node.value}`;
    levelContainer.appendChild(nodeElement);
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  }

  traverse(tree.root);

  const controls = document.createElement("div");
  controls.classList.add("controls");
  controls.innerHTML = `
      <button onclick="startTraversal('Amplitud', ${id})">Amplitud</button>
      <button onclick="startTraversal('preorden', ${id})">Preorden</button>
      <button onclick="startTraversal('inorden', ${id})">Inorden</button>
      <button onclick="startTraversal('postorden', ${id})">Postorden</button>
      
    `;
  container.appendChild(controls);

  const resultDiv = document.createElement("div");
  resultDiv.id = `result-${id}`;
  resultDiv.classList.add("result");
  container.appendChild(resultDiv);

  return container;
}

// Renderizar todos los árboles
function renderTrees() {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";
  trees.forEach(({ tree, id }) => {
    const treeElement = renderTree(tree, id);
    treesContainer.appendChild(treeElement);
  });
}

renderTrees();

// Función para iniciar el recorrido del árbol
window.startTraversal = (type, treeId) => {
  const { tree } = trees.find((t) => t.id === treeId);
  const resultDiv = document.querySelector(`#result-${treeId}`);
  let steps = [];
  if (type === "preorder") steps = tree.preorderTraversal();
  if (type === "inorder") steps = tree.inorderTraversal();
  if (type === "postorder") steps = tree.postorderTraversal();
  if (type === "breadth") steps = tree.breadthFirstTraversal();

  let index = 0;

  function highlightNode() {
    if (index > 0) {
      document
        .getElementById(`node-${treeId}-${steps[index - 1]}`)
        .classList.remove("active");
    }
    if (index < steps.length) {
      document
        .getElementById(`node-${treeId}-${steps[index]}`)
        .classList.add("active");
      index++;
      setTimeout(highlightNode, 1000);
    } else {
      resultDiv.innerText = `Recorrido ${type} (Árbol ${treeId}): ${steps.join(
        ", "
      )}`;
      resultDiv.style.display = "block";
    }
  }

  highlightNode();
};
