import React from "react";
import { Card } from "lib/components";

export const Primary = () => (
  <Card
    data={[{ icon: "Mobile", title: "Balance", displayIcon: "Balance" }]}
    id="12378"
    isCenter
  >
    Test Data
  </Card>
);

export default {
  title: "lib/components/Card",
  component: Card,
};
