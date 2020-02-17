import React from "react";
import { Text, Grid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/core";
import { useQuery } from "graphql-hooks";

export const allProductsQuery = `
  query {
    product {
      id
      name
      description
      created_at
    }
  }
`;

const ProductsList = () => {
  const { loading, error, data } = useQuery(allProductsQuery);

  if (loading) {
    return (
      <Box
        w="100%"
        h="100vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        w="100%"
        h="100vh"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      h="100vh"
      p={4}
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="800px" p={8} bg="gray.50" borderRadius="sm">
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)"
          ]}
          gap={8}
        >
          {data.product.map(item => {
            return (
              <Box
                key={item.id}
                w="100%"
                p={12}
                bg="#764ABC"
                rounded="md"
                color="white"
              >
                <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
                  {item.name}
                </Text>
                <Text mt={2}>{item.description}</Text>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsList;
