import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public queries: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, queries: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.queries = queries;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.queries?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.queries }; // copy

    console.log(queryObj);
    // Filtering
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields", "selectFields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = (this?.queries?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.queries?.page) || 1;
    const limit = Number(this?.queries?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  selectFields() {
    const fields = (this?.queries?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
