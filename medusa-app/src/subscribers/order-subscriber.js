// src/subscribers/order-subscriber.js

class OrderSubscriber {
    constructor({ orderService, eventBusService }) {
      this.orderService = orderService;
      
      // Subscribe to order events
      eventBusService.subscribe("order.placed", this.handleOrderPlaced);
      eventBusService.subscribe("order.fulfilled", this.handleOrderFulfilled);
      eventBusService.subscribe("order.shipment_created", this.handleShipmentCreation);
    }
  
    handleOrderPlaced = async (data) => {
      const { id } = data;
      
      console.log(`Order placed: ${id}`);
      
      // Here you would typically:
      // 1. Send confirmation email
      // 2. Update inventory
      // 3. Notify admin dashboard
      // 4. Log analytics
      
      // For the assignment, we're just logging
      console.log("Order placement processed successfully");
    }
  
    handleOrderFulfilled = async (data) => {
      const { id } = data;
      
      console.log(`Order fulfilled: ${id}`);
      
      // In a real application you might:
      // 1. Send fulfillment notification to customer
      // 2. Update order status in any external systems
      
      console.log("Order fulfillment processed successfully");
    }
  
    handleShipmentCreation = async (data) => {
      const { id, shipment_id } = data;
      
      console.log(`Shipment created for order ${id}: ${shipment_id}`);
      
      // In a real application you might:
      // 1. Send tracking information to customer
      // 2. Update shipping status
      
      console.log("Shipment creation processed successfully");
    }
  }
  
  module.exports = OrderSubscriber;