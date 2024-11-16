import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  constructor(public modelQuery: Query<T[], T>, public queries: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.queries = queries;
  }

  filterByTypes() {
    const type = this.queries.type;
    if (type) {
      this.modelQuery = this.modelQuery.find({ type: type } as FilterQuery<T>);
    }
    return this;
  }

  filterByPrice() {
    const minPrice = this.queries.minPrice;
    const maxPrice = this.queries.maxPrice;
    if (minPrice && maxPrice) {
      this.modelQuery = this.modelQuery.find({ pricePerHour: { $gte: minPrice, $lte: maxPrice } } as FilterQuery<T>);
    } else if (minPrice) {
      this.modelQuery = this.modelQuery.find({ pricePerHour: { $gte: minPrice } } as FilterQuery<T>);
    } else if (maxPrice) {
      this.modelQuery = this.modelQuery.find({ pricePerHour: { $lte: maxPrice } } as FilterQuery<T>);
    }
    return this;
  }

  filterByIsElectric() {
    const isElectric = this.queries.isElectric;
    if (isElectric !== undefined) {
      this.modelQuery = this.modelQuery.find({ isElectric: isElectric === "true" } as FilterQuery<T>);
    }
    return this;
  }

  filterByLocation() {
    const location = this.queries.location;
    if (location) {
      this.modelQuery = this.modelQuery.find({ location: { $regex: `^${location}$`, $options: "i" } } as FilterQuery<T>);
    }

    return this;
  }

  filterByAvailabilityDates() {
    const startDate = this.queries.startDate as string | Date;
    const endDate = this.queries.endDate as string | Date;
    if (startDate && endDate) {
      this.modelQuery = this.modelQuery.find({
        $or: [
          {
            availabilityDates: {
              $elemMatch: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
              },
            },
          },
          { availabilityDates: { $size: 0 } },
        ],
      } as FilterQuery<T>);
    }
    return this;
  }

  search(searchFields: string[]) {
    const searchValue = this.queries.searchValue;
    if (searchValue) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map((field) => ({ [field]: { $regex: searchValue, $options: "i" } })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queries };
    const excludeFields = [
      "searchValue",
      "sort",
      "limit",
      "page",
      "paginate",
      "fields",
      "type",
      "minPrice",
      "maxPrice",
      "isElectric",
      "location",
      "startDate",
      "endDate",
    ];

    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = (this.queries.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  select() {
    const fields = (this.queries.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate() {
    const page = Number(this.queries.page) || 1;
    const limit = Number(this.queries.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}
export default QueryBuilder;
