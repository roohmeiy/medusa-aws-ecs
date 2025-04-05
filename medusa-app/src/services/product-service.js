// src/services/product-service.js

const { BaseService } = require("medusa-interfaces");

class ProductService extends BaseService {
  constructor({ productRepository, manager }) {
    super();
    
    this.productRepository = productRepository;
    this.manager = manager;
  }

  /**
   * Custom method to find featured products
   * @param {number} limit - Maximum number of products to return
   * @returns {Promise<Array>} - Featured products
   */
  async getFeaturedProducts(limit = 5) {
    const productRepo = this.manager.getCustomRepository(this.productRepository);
    
    // Find products with specific tag (you would create this in the admin panel)
    return await productRepo.find({
      where: {
        tags: {
          value: "featured"
        }
      },
      relations: ["variants", "variants.prices", "tags"],
      take: limit
    });
  }

  /**
   * Get recently added products
   * @param {number} limit - Maximum number of products to return
   * @returns {Promise<Array>} - Recently added products
   */
  async getNewArrivals(limit = 10) {
    const productRepo = this.manager.getCustomRepository(this.productRepository);
    
    return await productRepo.find({
      relations: ["variants", "variants.prices"],
      order: {
        created_at: "DESC"
      },
      take: limit
    });
  }

  /**
   * Get products by category (collection)
   * @param {string} collectionId - ID of the collection
   * @param {number} limit - Maximum number of products to return
   * @returns {Promise<Array>} - Products in the collection
   */
  async getProductsByCollection(collectionId, limit = 15) {
    const productRepo = this.manager.getCustomRepository(this.productRepository);
    
    return await productRepo.find({
      where: {
        collection_id: collectionId
      },
      relations: ["variants", "variants.prices", "collection"],
      take: limit
    });
  }
}

module.exports = ProductService;