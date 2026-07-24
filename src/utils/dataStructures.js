// Stack implementation for Recently Viewed Foods
export class Stack {
  constructor(limit = 10) {
    this.items = [];
    this.limit = limit;
  }

  // Push element onto stack
  push(element) {
    // Prevent duplicates in recently viewed (remove existing first)
    this.items = this.items.filter(item => item.id !== element.id);
    this.items.push(element);
    
    // Ensure we don't exceed limit
    if (this.items.length > this.limit) {
      this.items.shift(); // Remove oldest
    }
  }

  // Pop element from stack
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // Peek top element
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Clear stack
  clear() {
    this.items = [];
  }

  // Get all items (newest first for UI rendering)
  getItems() {
    return [...this.items].reverse();
  }

  // Initialize from saved state
  load(savedItems) {
    if (Array.isArray(savedItems)) {
      this.items = savedItems.slice(-this.limit);
    }
  }
}
