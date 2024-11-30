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
              Terms & Conditions
            </h1>
            <p className="text-start w-full font-semibold text-sm md:text-lg text-[#4A4A4A]">
              Last updated on 22-10-2024 11:52:36
            </p>
            <p className="text-start w-full font-medium text-sm md:text-lg text-black">
              These Terms and Conditions, along with privacy policy or other
              terms (“Terms”) constitute a binding agreement by and between
              JAYMA BIO INNOVATIONS PRIVATE LIMITED, ( “Website Owner” or “we”
              or “us” or “our”) and you (“you” or “your”) and relate to your use
              of our website, goods (as applicable) or services (as applicable)
              (collectively, “Services”).
            </p>
            <p className="text-start w-full font-medium text-sm md:text-lg text-black">
              By using our website and availing the Services, you agree that you
              have read and accepted these Terms (including the Privacy Policy).
              We reserve the right to modify these Terms at any time and without
              assigning any reason. It is your responsibility to periodically
              review these Terms to stay informed of updates.
            </p>
            <Separator className="bg-[#4A4A4A]/20" />
          </div>

          <ListTextPrivacy
            title="The use of this website or availing of our Services is subject to the following terms of use:"
            list1="To access and use the Services, you agree to provide true, accurate and complete information to us
during and after registration, and you shall be responsible for all acts done through the use of your
registered account.
"
            list2="Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
performance, completeness or suitability of the information and materials offered on this website
or through the Services, for any specific purpose. You acknowledge that such information and
materials may contain inaccuracies or errors and we expressly exclude liability for any such
inaccuracies or errors to the fullest extent permitted by law.
"
            list3="Your use of our Services and the websiteis solely at your own risk and discretion.. You are
required to independently assess and ensure that the Services meet your requirements."
            list4="The contents of the Website and the Services are proprietary to Us and you will not have any
authority to claim any intellectual property rights, title, or interest in its contents."
            list5="You acknowledge that unauthorized use of the Website or the Services may lead to action against
you as per these Terms or applicable laws."
            list6="You agree to pay us the charges associated with availing the Services."
            list7="You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or
forbidden by these Terms, or Indian or local laws that might apply to you."
            list8="You agree and acknowledge that website and the Services may contain links to other third party
websites. On accessing these links, you will be governed by the terms of use, privacy policy and
such other policies of such third party websites."
            list9="You understand that upon initiating a transaction for availing the Services you are entering into a
legally binding and enforceable contract with the us for the Services."
            list10="You shall be entitled to claim a refund of the payment made by you in case we are not able to
provide the Service. The timelines for such return and refund will be according to the specific
Service you have availed or within the time period provided in our policies (as applicable). In case
you do not raise a refund claim within the stipulated time, than this would make you ineligible for
a refund.
"
            list11="Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to
perform an obligation under these Terms if performance is prevented or delayed by a force majeure
event.
"
            list12="These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
construed in accordance with the laws of India."
            list13="All disputes arising out of or in connection with these Terms shall be subject to the exclusive
jurisdiction of the courts in Rourkela, Odisha."
            list14="All concerns or communications relating to these Terms must be communicated to us using the
contact information provided on this website."
          />
        </div>
      </div>
    </section>
  );
};

export default PageDetails;
