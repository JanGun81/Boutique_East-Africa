/**
 * Unit-tester för CategoryService.
 */

import { describe, it, expect, vi } from "vitest";
import { CategoryService } from "@/lib/core/services/category.service";
import type { ICategoryRepository } from "@/lib/core/repositories/category.repository";
import type { Category } from "@/lib/core/types/category";

const catA: Category = {
  id: "a",
  name: "Baatis",
  slug: "baatis",
  description: null,
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
};

const catB: Category = {
  id: "b",
  name: "Dirac",
  slug: "dirac",
  description: null,
  createdAt: new Date("2025-01-02"),
  updatedAt: new Date("2025-01-02"),
};

function createMockRepo(cats: Category[]): ICategoryRepository {
  return {
    findAllOrderedByName: vi.fn().mockResolvedValue(cats),
  };
}

describe("CategoryService", () => {
  it("getAllCategories returnerar listan från repository oförändrad", async () => {
    const repo = createMockRepo([catA, catB]);
    const service = new CategoryService(repo);

    const result = await service.getAllCategories();

    expect(repo.findAllOrderedByName).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe("baatis");
    expect(result[1].slug).toBe("dirac");
  });
});
