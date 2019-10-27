const getRowHeaders = () => {
  return [
    "inside_stn_datetime_-7gmt",
    "inside_stn_temp",
    "outside_stn_temp",
    "inside_outside_temp_diff",
    "inside_stn_pres",
    "outside_stn_pres",
    "inside_stn_hum",
    "outside_stn_hum",
    "inside_stn_time",
    "inside_stn_lat",
    "inside_stn_lon",
    "outside_stn_id",
    "outside_stn_time",
    "outside_stn_lat",
    "outside_stn_lon",
    "inside_stn_id"
  ]
};

const getRowHeaderIndex = (rowName) => {
  return getRowHeaders().indexOf(rowName);
};

module.exports = {
  getRowHeaders,
  getRowHeaderIndex
};
