const getOptimisticUpdate = (
    messageId: string,
    updateFn: (message: any) => any
  ) => {
    return (prevData: any) => {
      if (Array.isArray(prevData?.messageData)) {
        return {
          ...prevData,
          messageData: prevData.messageData.map((message: { id: string }) =>
            message.id === messageId ? updateFn(message) : message
          ),
        };
      }
      return prevData;
    };
  };

export default getOptimisticUpdate;