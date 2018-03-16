// @flow
import React from "react";
import { Dimensions, View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import DateFilterDialog from "./ConnectedDateFilterDialog";
import FilterHeaderButton from "./FilterHeaderButton";
import TimesPickerDialog from "./TimesPickerDialog";
import Text from "./Text";
import {
  eventListHeaderBgColor,
  headerBgColor,
  interestButtonBgColor,
  interestButtonTextColor
} from "../constants/colors";
import text from "../constants/text";
import type { DateOrDateRange, Time } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

type Props = {
  dateFilter: ?DateOrDateRange,
  timeFilter: Time[]
};
type State = {
  datesPickerVisible: boolean,
  timesPickerVisible: boolean
};

class FilterHeader extends React.PureComponent<Props, State> {
  state = {
    datesPickerVisible: false,
    timesPickerVisible: false
  };

  showDatePicker = () => {
    this.setState({ datesPickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ datesPickerVisible: false });
  };

  showTimePicker = () => {
    this.setState({ timesPickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ timesPickerVisible: false });
  };

  render() {
    const { dateFilter, timeFilter } = this.props;
    const formattedDateFilter = dateFilter
      ? formatDateRange(dateFilter)
      : "Any day";
    const formattedTimeFilter =
      timeFilter.length < 3 ? timeFilter.join(", ") : "Any time";

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <StatusBar barStyle="light-content" animated />
        <View testID="filter-header" style={styles.content}>
          <View style={styles.contentInterest}>
            <View style={styles.interestButton}>
              <Text type="h2" style={styles.interestButtonText}>
                {text.filterByInterest}
              </Text>
            </View>
            <View style={styles.mapButton}>
              <Text style={styles.mapButtonText}>Map</Text>
            </View>
          </View>
          <View style={styles.contentFilters}>
            <FilterHeaderButton
              text={formattedDateFilter}
              onPress={this.showDatePicker}
              style={styles.filterButton}
            />
            <FilterHeaderButton
              text={formattedTimeFilter}
              onPress={this.showTimePicker}
              style={styles.filterButton}
            />
            <FilterHeaderButton
              text="Filters"
              onPress={() => {}}
              style={styles.filterButton}
            />
          </View>
        </View>
        <View style={styles.shape} />
        <DateFilterDialog
          onApply={this.hideDatePicker}
          onCancel={this.hideDatePicker}
          visible={this.state.datesPickerVisible}
        />
        <TimesPickerDialog
          onCancel={this.hideTimePicker}
          onTimesSelected={this.hideTimePicker}
          visible={this.state.timesPickerVisible}
        />
      </SafeAreaView>
    );
  }
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor
  },
  content: {
    paddingTop: 16,
    paddingBottom: 12
  },
  contentInterest: {
    alignItems: "center",
    flexDirection: "row"
  },
  interestButton: {
    flex: 1,
    height: 44,
    backgroundColor: interestButtonBgColor,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center"
  },
  interestButtonText: {
    color: interestButtonTextColor
  },
  mapButton: {
    marginHorizontal: 12,
    width: 52,
    height: 52,
    backgroundColor: interestButtonBgColor,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 25
  },
  mapButtonText: {
    color: interestButtonTextColor,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    paddingBottom: 6
  },
  contentFilters: {
    flexDirection: "row",
    marginTop: 8
  },
  filterButton: {
    marginLeft: 8
  },
  shape: {
    borderTopColor: headerBgColor,
    borderRightColor: headerBgColor,
    borderBottomColor: eventListHeaderBgColor,
    borderLeftColor: eventListHeaderBgColor,
    borderTopWidth: 16,
    borderLeftWidth: width
  }
});

export default FilterHeader;
