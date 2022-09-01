import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import PetsIcon from "@mui/icons-material/Pets";

function DogList({ filteredDogsList }) {
  return (
    <List>
      {filteredDogsList.length > 0 &&
        filteredDogsList.map((dog, index) => {
          return (
            <ListItem key={`${dog}${index}`}>
              <ListItemButton>
                <ListItemIcon>
                  <PetsIcon />
                </ListItemIcon>
                <ListItemText primary={dog}></ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}

export default DogList;
