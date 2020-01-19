/**
 Users need to be able to filter/search for the records on any one of the given properties of a
 record. When filter/searching by date users will supply a range,
 all other fields would use their corresponding data type.
 Users can use more than one filter at a time.
*/
import { createMakeRequest } from "../utils/routeUtils";

describe("Can Filter and Search", () => {
  beforeEach(() => {
    createMakeRequest();
  });
  describe("Verify user can filter and search", () => {
    it.skip("Can filter on a record", () => {});
    it.skip("Can filter by a date range", () => {});
    it.skip("Can filter on multiple ranges", () => {});
  });
});
