import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  HeaderContainer,
  ListingItemContainer,
  AdvancedSearchContainer,
  FooterContainer,
} from "../containers";
import { Section } from "../components";
// import { getPropertyList } from "../redux/actions/propertiesAction";

const Listing = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [childData, setChildData] = useState([]);

  const requestlistings = async function () {
    const res = await fetch(`/.netlify/functions/addnew`);
    const json = await res.json();
    return json;
  };

  useEffect(async () => {
    const res = await requestlistings();
    setProperties(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setProperties(childData);
  }, [childData]);

  console.log(properties);
  return (
    <>
      <HeaderContainer bg="false" />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <Section.Flex>
            <Section.FlexItem width="30%" relative flexStart>
              <Section.Shadow>
                <AdvancedSearchContainer passChildData={setChildData} />
              </Section.Shadow>
            </Section.FlexItem>
            <Section.FlexItem width="65%">
              <Section.Title>Our Property List</Section.Title>
              {isLoading ? (
                <h3>Loading ...</h3>
              ) : (
                <Section.Content>
                  {properties.map((featured) => (
                    <ListingItemContainer
                      key={featured._id}
                      featured={featured}
                      width="49%"
                    />
                  ))}
                </Section.Content>
              )}
              <Section.Footer>
                <Section.Button>More Listing</Section.Button>
              </Section.Footer>
            </Section.FlexItem>
          </Section.Flex>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default Listing;
