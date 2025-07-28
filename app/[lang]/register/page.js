import SocialMediaLogin from "@/components/auth/SocialMediaLogin";
import RegisterForm from "@/components/auth/register/RegisterForm";
import { getLang } from "@/languages/dynamicLangSwitch";
import Link from "next/link";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const lan = await getLang(lang);
  const regLan = lan?.register;
  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            {regLan?.title}
          </h2>
          <p className="text-gray-600 mb-6 text-sm">{regLan?.subtitle}</p>

          <RegisterForm lan={regLan} />

          <SocialMediaLogin />
          <p className="mt-4 text-center text-gray-600">
            {regLan?.haveAccount}{" "}
            <Link href={`/${lang}/login`} className="text-primary">
              {regLan?.login}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
