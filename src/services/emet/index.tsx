import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { HeroServices } from "../HeroServices";
import { NetworkAPIError } from "@/utils/response-type";

type TuseMailByIdProps = {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
  params: {
    id: number;
  };
};

const useMailById = (props?: TuseMailByIdProps) => {
  const useMailByIdFn = async () => {
    try {
      const response = await HeroServices.get(`/mail/pdf/${props?.params.id}`);

      const { status } = response;

      if (status !== 200) return;

      return response?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data || "Unknown error";
    }
  };

  const query = useQuery({
    queryKey: ["useMailById", props?.params],
    queryFn: useMailByIdFn,
    staleTime: Infinity,
    enabled: Boolean(props?.params?.id),
  });

  return { ...query };
};

export default useMailById;
