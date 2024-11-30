import { Separator } from "@/components/ui/separator";
import React from "react";
import { ListTextPrivacy } from "@/components/shared/list-text";

const PageDetails = () => {
  return (
    <section className="w-full h-full flex flex-col gap-4 px-5 md:px-10 lg:px-14 max-w-screen-2xl mx-auto">
      <div className="w-full flex items-center justify-center flex-col gap-5 mt-4 md:mt-10">
        <div className="w-full h-full pt-4 pb-4 md:py-6 flex flex-col items-start justify-center gap-5 md:gap-8 md:mt-5">
          <div className="w-full flex flex-col gap-4 md:gap-6">
            <h1 className="text-3xl md:text-[48px] font-bold w-full text-start">
              Cancellation & Refund Policy
            </h1>
            <p className="text-start w-full font-semibold text-sm md:text-lg text-[#4A4A4A]">
              Last updated on 22-10-2024
            </p>
            <Separator className="bg-[#4A4A4A]/20" />
          </div>

          <ListTextPrivacy
            title="JAYMA BIO INNOVATIONS PRIVATE LIMITED believes in helping its customers as far as possible,
            and has therefore a liberal cancellation policy. Under this policy:"
            list1="Cancellations will be considered only if the request is made immediately after placing the order.
However, the cancellation request may not be entertained if the orders have been communicated to the
vendors/merchants and they have initiated the process of shipping them.
"
            list2=" JAYMA BIO INNOVATIONS PRIVATE LIMITED does not accept cancellation requests for
perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer
establishes that the quality of product delivered is not good.
"
            list3=" In case of receipt of damaged or defective items please report the same to our Customer Service team.
The request will, however, be entertained once the merchant has checked and determined the same at his
own end. This should be reported within Only same day days of receipt of the products. In case you feel
that the product received is not as shown on the site or as per your expectations, you must bring it to the
notice of our customer service within Only same day days of receiving the product. The Customer
Service Team after looking into your complaint will take an appropriate decision."
            list4=" In case of complaints regarding products that come with a warranty from manufacturers, please refer
the issue to them. In case of any Refunds approved by the JAYMA BIO INNOVATIONS PRIVATE
LIMITED, it’ll take 6-8 Days days for the refund to be processed to the end customer."
          />
        </div>
      </div>
    </section>
  );
};

export default PageDetails;
