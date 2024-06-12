import { View } from "react-native";
import { memo } from "react"
import { Colors, FontFamily } from "@/styles/designSystem";
import DropDownPicker, { 
  DropDownPickerProps, 
  ValueType 
} from "react-native-dropdown-picker";

function Dropdown({ 
  open = false, 
  setOpen, 
  value,
  setValue, 
  items, 
  setItems,
  ...rest
}: DropDownPickerProps<ValueType | any>) {
  return (
    <View style={{ flex: 1, zIndex: 5 }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <DropDownPicker
          searchable
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          listMode="SCROLLVIEW"
          placeholder="Select a market"
          searchPlaceholder="Search for a market..."
          textStyle={{
            fontFamily: FontFamily[500],
            color: Colors.secondary
          }}
          dropDownContainerStyle={{
            backgroundColor: Colors.surface_secondary
          }}
          style={{
            borderRadius: 8,
            backgroundColor: Colors.surface_secondary
          }}
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}
          {...rest}
        />
      </View>
    </View>
  );
}

export default memo(Dropdown)